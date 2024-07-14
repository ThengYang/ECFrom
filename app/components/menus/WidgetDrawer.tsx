
import { useState } from "react";

import {
   Box,
   Divider,
   List,
   ListItemButton,
   ListItemIcon,
   ListItemText,
   Collapse,
} from "@mui/material"

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMore from '@mui/icons-material/ExpandMore';
import LinearScaleRoundedIcon from '@mui/icons-material/LinearScaleRounded';

import { SubtitleText, TitleText } from "@/app/widgets/texts/DragItems";
import { FormGrid } from "@/app/widgets/layout/DragItems";

import {
   TextResponse,
   SingleSelect,
   MultiSelect,
   DateTime,
   CheckList,
   Table
} from "@/app/widgets/Inputs/DragItems";

import {
   WIDGET_TYPE,
   HAS_STYLE_WIDGETS,
   IS_INPUT_WIDGETS,
   IS_SELECT_WIDGETS,
   HAS_RESPOND_TYPE,
   IS_INPUTTABLE,
   IS_FORMGRID
} from "@/app/constants/WigetType";

import SettingsIcon from '@mui/icons-material/Settings';
import ContrastIcon from '@mui/icons-material/Contrast';
import AccountTreeIcon from '@mui/icons-material/AccountTree';

import { ColumnOption, RowOption, AdvanceOption } from "./drawers/options/TableOptions";
import { GridColumnOption, GridRowOption } from "./drawers/options/GridOptions";
import { SingleSelectSettingOptions } from "./drawers/options/SingleSelectOptions";
import StyleOption from "./drawers/options/StyleOptions";
import WidgetContentOptions from "./drawers/options/WidgetContentOptions";
import WidgetVisibilityOption from "./drawers/options/WidgetVisibilityOption";
import { WidgetResponseTypeOptions, WidgetResponseRequiredOptions } from "./drawers/options/WidgetResponseOptions";
import FormTab from "./tabs/FormTab";

interface WidgetDrawerProps {
   activeWidget: WIDGET_TYPE | null
   updateWidget?: (widget: WIDGET_TYPE) => void
   widgetNames: { [key: string]: any }
   setWidgetNames: (name: { [key: string]: any }) => void
   getWidget: (id: string) => void
}

const WidgetDrawer = (props: WidgetDrawerProps) => {

   const {
      activeWidget,
      updateWidget = (widget: WIDGET_TYPE) => void 0,
      widgetNames,
      setWidgetNames,
      getWidget
   } = props

   const [isLayout, setIsLayout] = useState(false);
   const [isMenu, setIsMenu] = useState(false);
   const [isText, setIsText] = useState(false);
   const [isInput, setIsInput] = useState(false);

   if (HAS_STYLE_WIDGETS(activeWidget)) {
      return (
         <Box id='active-widget-editor' >
            <FormTab
               tabs={
                  [
                     { label: "Setting", icon: <SettingsIcon />, iconPosition: 'top' },
                     { label: "Style", icon: <ContrastIcon />, iconPosition: 'top' },
                     { label: "Advance", icon: <AccountTreeIcon />, iconPosition: 'top' },
                  ]
               }
            >
               <Box>
                  {IS_FORMGRID(activeWidget) ?
                     <Box>
                        <GridColumnOption activeWidget={activeWidget} updateWidget={updateWidget} />
                        <GridRowOption activeWidget={activeWidget} updateWidget={updateWidget} />
                     </Box> :
                     <Box>
                        <WidgetContentOptions
                           activeWidget={activeWidget}
                           updateWidget={updateWidget}
                           widgetNames={widgetNames}
                           setWidgetNames={setWidgetNames}
                        />
                        {IS_INPUTTABLE(activeWidget) ?
                           <Box>
                              <ColumnOption activeWidget={activeWidget} updateWidget={updateWidget} />
                              <RowOption activeWidget={activeWidget} updateWidget={updateWidget} />
                           </Box>
                           :

                           IS_SELECT_WIDGETS(activeWidget) ?
                              HAS_RESPOND_TYPE(activeWidget) ?
                                 <Box>
                                    <SingleSelectSettingOptions activeWidget={activeWidget} updateWidget={updateWidget} />
                                    <WidgetResponseTypeOptions activeWidget={activeWidget} updateWidget={updateWidget} />
                                    <WidgetResponseRequiredOptions activeWidget={activeWidget} updateWidget={updateWidget} />
                                 </Box> :
                                 <Box>
                                    <SingleSelectSettingOptions activeWidget={activeWidget} updateWidget={updateWidget} />
                                    <WidgetResponseRequiredOptions activeWidget={activeWidget} updateWidget={updateWidget} />
                                 </Box> :
                              IS_INPUT_WIDGETS(activeWidget) ?
                                 HAS_RESPOND_TYPE(activeWidget) ?
                                    <Box>
                                       <WidgetResponseTypeOptions activeWidget={activeWidget} updateWidget={updateWidget} />
                                       <WidgetResponseRequiredOptions activeWidget={activeWidget} updateWidget={updateWidget} />
                                    </Box> :
                                    <WidgetResponseRequiredOptions activeWidget={activeWidget} updateWidget={updateWidget} /> :
                                 <></>
                        }
                     </Box>
                  }
               </Box>
               <Box>
                  <StyleOption activeWidget={activeWidget} updateWidget={updateWidget} />
               </Box>
               <Box>
                  <WidgetVisibilityOption
                     activeWidget={activeWidget}
                     updateWidget={updateWidget}
                     widgetNames={widgetNames}
                     getWidget={getWidget}
                  />
                  {IS_INPUTTABLE(activeWidget) ?
                     <AdvanceOption
                        activeWidget={activeWidget}
                        updateWidget={updateWidget}
                        getWidget={getWidget}
                        widgetNames={widgetNames}
                     /> : <></>
                  }
               </Box>
            </FormTab>
         </Box>
      )
   }

   return (
      <Box>
         <Divider />
         <List>
            <ListItemButton onClick={() => setIsMenu(!isMenu)}>
               <ListItemIcon>
                  {isMenu ? <ExpandMore /> : <ChevronRightIcon />}
               </ListItemIcon>
               <ListItemText primary="Menu" />
            </ListItemButton>

            <Collapse in={isMenu} timeout="auto" unmountOnExit>
               <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                     <ListItemIcon>
                        <LinearScaleRoundedIcon />
                     </ListItemIcon>
                     <ListItemText primary="Timeline" />
                  </ListItemButton>
               </List>
            </Collapse>
         </List>
         <Divider />
         <List>
            <ListItemButton onClick={() => setIsLayout(!isLayout)}>
               <ListItemIcon>
                  {isLayout ? <ExpandMore /> : <ChevronRightIcon />}
               </ListItemIcon>
               <ListItemText primary="Layout" />
            </ListItemButton>

            <Collapse in={isLayout} timeout="auto" unmountOnExit>
               <FormGrid />
            </Collapse>
         </List>
         <Divider />
         <List>
            <ListItemButton onClick={() => setIsText(!isText)}>
               <ListItemIcon>
                  {isText ? <ExpandMore /> : <ChevronRightIcon />}
               </ListItemIcon>
               <ListItemText primary="Text" />
            </ListItemButton>
            <Collapse in={isText} timeout="auto" unmountOnExit>
               <TitleText />
               <SubtitleText />
            </Collapse>
         </List>
         <Divider />
         <List>
            <ListItemButton onClick={() => setIsInput(!isInput)}>
               <ListItemIcon>
                  {isInput ? <ExpandMore /> : <ChevronRightIcon />}
               </ListItemIcon>
               <ListItemText primary="Response" />
            </ListItemButton>
            <Collapse in={isInput} timeout="auto" unmountOnExit>
               <TextResponse />
               <DateTime />
               <CheckList />
               <SingleSelect />
               <MultiSelect />
               <Table />
            </Collapse>
         </List>
         <Divider />
      </Box>
   )
}

export default WidgetDrawer