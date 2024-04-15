import useWorkspace from '@/hooks/useWorkspace';
import { Excalidraw, MainMenu, WelcomeScreen, FONT_FAMILY } from '@excalidraw/excalidraw';

export default function Canvas() {
    const { canvasData, uploadCanvas, setCanvasData, fileName } = useWorkspace();

    const initialState = canvasData
        ? {
              elements: canvasData,
              scrollToContent: true,
          }
        : {
              scrollToContent: true,
          };

    const uiOptions = {
        canvasActions: {
            toggleTheme: false,
            changeViewBackgroundColor: false,
            saveToActiveFile: false,
        },
    };

    const handleOnChange = (data: string) => {
        setCanvasData(data);
        uploadCanvas(data);
    };

    return (
        <div className='h-full w-full'>
            <Excalidraw
                UIOptions={uiOptions}
                initialData={initialState}
                onChange={(excalidrawElements, appState, files) => {
                    handleOnChange(JSON.stringify(excalidrawElements));
                }}
                isCollaborating={false}
                zenModeEnabled={true}
                theme='light'
                name={fileName}
            >
                <MainMenu>
                    <MainMenu.DefaultItems.ClearCanvas />
                    <MainMenu.DefaultItems.Export />
                    <MainMenu.DefaultItems.SaveAsImage />
                </MainMenu>
                <WelcomeScreen>
                    <WelcomeScreen.Hints.MenuHint />
                    <WelcomeScreen.Hints.ToolbarHint />
                </WelcomeScreen>
            </Excalidraw>
        </div>
    );
}
