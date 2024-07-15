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

  const [widgets, setWidgets] = useState<{ [id: string]: WIDGET_TYPE }>({})
  const [widgetOrder, setWidgetOrder] = useState<Array<string>>([])
  const [widgetNames, setwidgetNames] = useState<{ [id: string]: any }>({ 'length': 0 });

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const handleGetWidget = (id: string): WIDGET_TYPE | undefined | null => {
    return widgets[id]
  }

  const handleAddWidget = (id: string | null, itemType: string) => {
    const tempWidgets = { ...widgets }
    const tempWidgetOrder = [...widgetOrder]

    const { newWidget, newWidgetNames } = initialize(pageId, itemType, widgetNames)
    const idx = tempWidgetOrder.findIndex(widgetID => widgetID === id)

    if (idx !== -1) {
      delete tempWidgets[tempWidgetOrder[idx]]
      tempWidgetOrder[idx] = newWidget.id
    }
    else {
      tempWidgetOrder.push(newWidget.id)
    }
    tempWidgets[newWidget.id] = newWidget

    setWidgets(tempWidgets)
    setWidgetOrder(tempWidgetOrder)
    setWidgetNames(newWidgetNames)
  }

  const handleUpdateWidget = (updatedWidget: WIDGET_TYPE) => {
    const tempWidgets = { ...widgets }
    tempWidgets[updatedWidget.id] = updatedWidget
    if (activeWidget?.id === updatedWidget.id) {
      setActiveWidget(updatedWidget)
    }
    setWidgets(tempWidgets)
  }

  const handleDeleteWidget = (id: string) => {
    const tempWidgets = { ...widgets }
    delete tempWidgets[id]
    setWidgets(tempWidgets)
    setWidgetOrder(widgetOrder.filter(widgetID => widgetID !== id))
  }

  const handleAddWidgetAbove = (id: string) => {
    const tempWidgets = { ...widgets }
    const tempWidgetOrder = [...widgetOrder]
    const { newWidget, newWidgetNames } = initialize(tempWidgets[id].parentId, tempWidgets[id].type, widgetNames)
    const index = tempWidgetOrder.findIndex(widgetID => widgetID === id)

    if (index !== -1) {
      tempWidgetOrder.splice(index, 0, newWidget.id)
      setWidgetOrder(tempWidgetOrder)
      setWidgets(tempWidgets)
      setWidgetNames(newWidgetNames)
    }
  }

  const handleMoveWidget = (sourceId: string, targetId: string) => {
    const sourceIndex = widgetOrder.findIndex(widgetID => widgetID === sourceId)
    const targetIndex = widgetOrder.findIndex(widgetID => widgetID === targetId)

    if (sourceIndex !== -1 && targetIndex !== -1) {
      const tempWidgetOrder = [...widgetOrder]
      const sourceWidget = tempWidgetOrder[sourceIndex]
      tempWidgetOrder.splice(sourceIndex, 1);
      tempWidgetOrder.splice(targetIndex, 0, sourceWidget);
      setWidgetOrder(tempWidgetOrder)
    }
  }

  const handleSetWidgetActive = (widgetID: string | null | undefined) => {
    if (widgetID) setActiveWidget(widgets[widgetID])
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
                  {widgetOrder.map(widgetID =>
                    <WidgetDrogPad
                      onDrop={handleMoveWidget}
                      widgets={widgetOrder}
                      key={widgetID}
                      targetId={widgetID}
                      parent={pageId}
                    >
                      <GenerateWidget
                        widget={widgets[widgetID]}
                        onChange={handleUpdateWidget}
                        onDelete={handleDeleteWidget}
                        onAdd={widgets[widgetID].type === 'new-section' ? handleAddWidget : handleAddWidgetAbove}
                        onMove={handleMoveWidget}
                        updateSubItems={handleUpdateWidget}
                        widgetNames={widgetNames}
                        getWidget={handleGetWidget}
                        setWidgetNames={setWidgetNames}
                        setActive={handleSetWidgetActive}
                        setInactive={() => setActiveWidget(null)}
                        handleWidgetCondition={handleWidgetCondition}
                      />
                    </WidgetDrogPad>
                  )}
                  <Section onAdd={handleAddWidget} />
                </Box> :
                <Preview
                  widgetOrder={widgetOrder}
                  getWidget={handleGetWidget}
                  updateWidget={handleUpdateWidget}
                  handleWidgetCondition={handleWidgetCondition}
                />
              }
            </Box>
          </Box>
        </DropSpace>
      </DndProvider>
    </Box>
  )
}

export default AccountsPage