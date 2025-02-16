import * as React from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { cn, useDrawerPopstateClose } from '@/shared/lib';
import { useBreakpointValue } from '@chakra-ui/react';
const Drawer = ({
  open = false,
  onOpenChange = () => { },
  activeSnapPoint = 0.8,
  //setActiveSnapPoint = () => {},

  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => {
  useDrawerPopstateClose(open, onOpenChange);
  const drawerDirection = useBreakpointValue<
    'bottom' | 'right' | 'left' | 'top' | undefined
  >({ base: 'bottom', md: 'right' });

  return (
    <DrawerPrimitive.Root
      direction={drawerDirection ?? 'bottom'}
      open={open}
      snapPoints={drawerDirection === 'bottom' && open ? [0.8, 1] : []}
      fadeFromIndex={0}
      onOpenChange={onOpenChange}
      preventScrollRestoration={false}
      activeSnapPoint={
        drawerDirection === 'bottom' && open ? activeSnapPoint : 0
      }
      {...props}
    />
  );
};
Drawer.displayName = 'Drawer';

const DrawerTrigger = DrawerPrimitive.Trigger;

const DrawerPortal = DrawerPrimitive.Portal;

const DrawerClose = DrawerPrimitive.Close;

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn('fixed inset-0 z-50 bg-black/40', className)}
    {...props}
  />
));
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => {
  return (
    <DrawerPortal>
      <DrawerOverlay />
      <DrawerPrimitive.Content
        ref={ref}
        className={cn(
          'fixed inset-x-0 md:right-0 md:left-auto h-[100%] max-h-[100%] md:max-h-[100%] md:h-[100%] md:max-w-[400px]' +
          ' px-3 bottom-0 z-50 mt-24 flex flex-col rounded-t-[25px] md:rounded-t-none md:rounded-tl-[15px] md:rounded-bl-[15px]' +
          ' bg-l-main dark:bg-d-main focus:outline-none border-[0px] md:p-5',
          className
        )}
        {...props}
      >
        <DrawerPrimitive.Handle className="mt-4 w-[100%] min-h-4 md:hidden">
          <div className="w-[100%] flex justify-center items-center">
            <div className="mt-3 min-h-1.5 w-[35%] rounded-full bg-gray-300" />
          </div>
        </DrawerPrimitive.Handle>
        <DrawerDescription />
        <VisuallyHidden.Root>
          <DrawerTitle />
        </VisuallyHidden.Root>

        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  );
});
DrawerContent.displayName = 'DrawerContent';

const DrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('grid gap-1.5 p-4 text-center sm:text-left', className)}
    {...props}
  />
);
DrawerHeader.displayName = 'DrawerHeader';

const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('mt-auto flex flex-col gap-2 p-4', className)}
    {...props}
  />
);
DrawerFooter.displayName = 'DrawerFooter';

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn(
      'text-lg font-semibold leading-none tracking-tight',
      className
    )}
    {...props}
  />
));
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    aria-describedby={undefined}
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
DrawerDescription.displayName = DrawerPrimitive.Description.displayName;

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};
