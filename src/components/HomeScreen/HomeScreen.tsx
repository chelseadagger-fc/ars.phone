import MainHomeArea from "./MainHomeArea";
import ShortcutBar from "./ShortcutBar";

interface HomeScreenProps {
    onAppPress: (newScreen: string) => void;
  }

  const HomeScreen: React.FC<HomeScreenProps> = ({ onAppPress }) => {
    return (
      <div className="h-dvh">
        <MainHomeArea />
        <ShortcutBar onAppPress={onAppPress} />
      </div>
    );
  };
  
  export default HomeScreen;