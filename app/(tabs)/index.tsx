import { ScrollView } from "react-native";
import BookDoctors from "../../components/BookDoctors";
import Categories from "../../components/Categories";
import FAQSection from "../../components/FAQSection";
import HomeCarousel from "../../components/HomeCarousel";
import MedicalStore from "../../components/MedicalStore";
import Search from "../../components/Search";
import { TopNav } from "../../components/TopNav";

export default function HomePage() {
  return (
    <ScrollView className="flex-1" style={{ backgroundColor: "white" }}>
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
