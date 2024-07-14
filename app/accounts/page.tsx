"use client"

import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

import { styled, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { Typography } from "@mui/material";

import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import WidgetDrawer from "../components/menus/WidgetDrawer";
import DropSpace from "../components/dragDrop/DropSpace";
import GenerateWidget from "../components/generators/GenerateWidget";
import WidgetDrogPad from "../widgets/WidgetDropPad";
import { IS_FORMGRID, IS_INPUTTABLE, WIDGET_TYPE } from "../constants/WigetType";
import initialize from "../widgets/widgetInitializer";
import parseCondition from "../widgets/WidgetConditionParser";

import Section from "../widgets/layout/Section";
import NavBar from "./NavBar";
import Preview from "./Preview";


const drawerWidth = 300;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: 0,

});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',

  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

interface PageProps {
  pageId?: string
}

const Id = uuidv4()

const AccountsPage = (props: PageProps) => {

  const { pageId = Id } = props

  const [open, setOpen] = useState(true);
  const [activeWidget, setActiveWidget] = useState<WIDGET_TYPE | null>(null)

  const [widgets, setWidgets] = useState<Array<WIDGET_TYPE>>([])

  const [widgetNames, setwidgetNames] = useState<{ [key: string]: any }>({ 'length': 0 });

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const handleGetWidget = (id: string, gridItems?: Array<Array<WIDGET_TYPE>> | null): any => {
    let foundWidget = null
    if (gridItems) {
      for (const itemCol of gridItems) {
        foundWidget = itemCol.find(widget => IS_FORMGRID(widget) ? handleGetWidget(id, gridItems = widget.items) : widget.id === id)
        if (foundWidget) {
          return foundWidget
        }
      }
    }

    else {
      for (const widget of widgets) {
        if (widget.id === id) {
          return widget
        }
        else if (IS_FORMGRID(widget)) {
          foundWidget = handleGetWidget(id, gridItems = widget.items)
          if (foundWidget) return foundWidget
        }
        else if (IS_INPUTTABLE(widget)) {
          if (widget.footer.id === id) {
            return widget.footer
          }
          else if (IS_FORMGRID(widget.footer)) {
            foundWidget = handleGetWidget(id, gridItems = widget.footer.items)
            if (foundWidget) return foundWidget
          }
        }
      }
    }

    return foundWidget
  }

  const handleAddWidget = (id: string | null, itemType: string) => {
    const tempWidgets = [...widgets]

    const { newWidget, newWidgetNames } = initialize(pageId, itemType, widgetNames)

    if (id !== null && newWidget.id !== '-1') {

      const index = widgets.findIndex(widget => widget.id === id)
      if (index !== -1) {
        const tempWidgets = [...widgets]
        tempWidgets[index] = newWidget;
        setWidgets(tempWidgets);
      }
    }

    else if (newWidget.id !== '-1') {
      tempWidgets.push(newWidget)
      setWidgets(tempWidgets)
    }
    setWidgetNames(newWidgetNames);
  }

  const handleUpdateWidget = (item: WIDGET_TYPE) => {
    if (item.parentId === pageId || !item.parentId) {
      setWidgets((prevWidgets) =>
        prevWidgets.map(widget =>
          widget.id === item.id ? item : widget
        )
      )
    }
    else {
      const parentWidget = handleGetWidget(item.parentId)

      if (parentWidget && parentWidget.type === 'grid') {
        for (let row of parentWidget.items) {
          const colIndex = row.findIndex((widget: WIDGET_TYPE) => widget.id == item.id)
          if (colIndex !== -1) {
            row[colIndex] = item;
            break;
          }
        }

        setWidgets((prevWidgets) =>
          prevWidgets.map(widget =>
            widget.id === parentWidget.id ? parentWidget : IS_INPUTTABLE(widget) ?
              widget.footer.id === parentWidget.id ? { ...widget, footer: parentWidget } : widget : widget
          )
        )
      }
      else if (parentWidget && parentWidget.type === 'table') {

        parentWidget.footer = item
        setWidgets((prevWidgets) =>
          prevWidgets.map(widget =>
            widget.id === parentWidget.id ? parentWidget : widget
          )
        )
      }
    }


    if (activeWidget?.id === item.id) {
      setActiveWidget(item)
    }
  }

  const handleDeleteWidget = (id: string) => {
    const index = widgets.findIndex(widget => widget.id === id)
    if (index !== -1) {
      const tempWidgets = [...widgets]
      tempWidgets.splice(index, 1);

      let tempWidgetNames = widgetNames
      delete tempWidgetNames[widgets[index].name];
      tempWidgetNames.length -= 1;

      setWidgets(tempWidgets)
      setWidgetNames(tempWidgetNames)
    }
  }

  const handleAddWidgetAbove = (id: string) => {
    const index = widgets.findIndex(widget => widget.id === id)
    if (index !== -1) {
      const tempWidgets = [...widgets]
      tempWidgets.splice(
        index,
        0,
        {
          id: uuidv4(),
          parentId: pageId as string,
          type: 'new-section',
          name: ''
        });
      setWidgets(tempWidgets)
    }
  }

  const handleMoveWidget = (sourceId: string, targetId: string) => {

    const sourceIndex = widgets.findIndex(widget => widget.id === sourceId)
    const targetIndex = widgets.findIndex(widget => widget.id === targetId)

    if (sourceIndex !== -1 && targetIndex !== -1) {
      const tempWidgets = [...widgets]
      const sourceWidget = tempWidgets[sourceIndex]

      tempWidgets.splice(sourceIndex, 1);
      tempWidgets.splice(targetIndex, 0, sourceWidget);

      setWidgets(tempWidgets)
    }
  }

  const setWidgetNames = (names: { [key: string]: any }) => {
    setwidgetNames(names);
  }

  const handleWidgetCondition = (parseEvent: string, data: any): any => {
    return parseCondition(handleGetWidget, widgetNames, parseEvent, data)
  }

  return (
    <Box className="overflow-auto">
      <DndProvider backend={HTML5Backend}>
        <DropSpace>
          <Box sx={{ display: 'flex' }}>
            <Drawer
              variant="permanent"
              id="widget-drawer"
              sx={{ width: open ? '340px' : '0px' }}
              PaperProps={{
                style: { width: open ? '340px' : '0px' },
              }}
            >
              <DrawerHeader sx={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 1 }}>
                <Typography variant="h5" sx={{ width: 'fit-content', margin: 'auto' }}>
                  Widgets
                </Typography>
              </DrawerHeader>
              < WidgetDrawer
                activeWidget={activeWidget}
                widgetNames={widgetNames}
                setWidgetNames={setWidgetNames}
                getWidget={handleGetWidget}
                updateWidget={handleUpdateWidget}
              />
            </Drawer>
            <Box component="main" className="relative h-screen  items-center w-full overflow-x-hidden">
              <NavBar />
              <IconButton
                className="sticky bg-white w-1 rounded-none hover:bg-white"
                sx={{ left: '0px', top: '50%' }}
                color="primary"
                onClick={handleDrawerOpen}
                size="large"
              >
                {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
              {open ?
                <Box className="p-20 pt-1">
                  {widgets.map(item =>
                    <WidgetDrogPad
                      onDrop={handleMoveWidget}
                      widgets={widgets}
                      key={item.id}
                      targetId={item.id}
                      parent={pageId}
                    >
                      <GenerateWidget
                        item={item}
                        onChange={handleUpdateWidget}
                        onDelete={handleDeleteWidget}
                        onAdd={item.type === 'new-section' ? handleAddWidget : handleAddWidgetAbove}
                        onMove={handleMoveWidget}
                        updateSubItems={handleUpdateWidget}
                        widgetNames={widgetNames}
                        setWidgetNames={setWidgetNames}
                        setActive={(childItem: WIDGET_TYPE | null) => childItem ? setActiveWidget(childItem) : setActiveWidget(item)}
                        setInactive={() => setActiveWidget(null)}
                        handleWidgetCondition={handleWidgetCondition}
                      />
                    </WidgetDrogPad>
                  )}
                  <Section onAdd={handleAddWidget} />
                </Box> : <Preview widgets={widgets} updateWidget={handleUpdateWidget} handleWidgetCondition={handleWidgetCondition} />
              }
            </Box>
          </Box>
        </DropSpace>
      </DndProvider>
    </Box>
  )
}

export default AccountsPage