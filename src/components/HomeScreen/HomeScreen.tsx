import MainHomeArea from "./MainHomeArea";
import ShortcutBar from "./ShortcutBar";

interface HomeScreenProps {
    // onAppPress: (newScreen: string) => void;
    navigateTo: (newScreen: string) => void;
  }

  const HomeScreen: React.FC<HomeScreenProps> = ({ navigateTo }) => {
    return (
      <div className="h-dvh w-full bg-wallpaper01 bg-cover">
        <MainHomeArea />
        <ShortcutBar navigateTo={navigateTo} />
      </div>
    );
  };
  
  export default HomeScreen;