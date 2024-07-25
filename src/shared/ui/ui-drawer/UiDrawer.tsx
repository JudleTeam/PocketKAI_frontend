import {
    Drawer,
 } from "@chakra-ui/react";
import { ReactNode } from "react";

export function UiDrawer({ drawerActions, isOpen, onClose }: { drawerActions: () => ReactNode; isOpen: boolean; onClose: () => void }){
    return(
        <Drawer placement='bottom' isOpen={isOpen} onClose={onClose}>
            {drawerActions()}
        </Drawer>
    )
}
