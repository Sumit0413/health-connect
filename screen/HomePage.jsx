

import { ScrollView } from "react-native";
import {TopNav} from "../components/TopNav";
import Search from "../components/Search";
import HomeCarousel from "../components/HomeCarousel";
import Categories   from "../components/Categories";
import MedicalStore from "../components/MedicalStore";
import BookDoctors from "../components/BookDoctors";
import FAQSection from "../components/FAQSection";


export const HomePage = () => {
  return (
  
    <ScrollView className="flex-1  " style={{backgroundColor:"white"}}>
      <TopNav />
     <Search />
      <HomeCarousel />
      <Categories />
      <MedicalStore />
      <BookDoctors />
      <FAQSection />
    </ScrollView>
  
  );
}