import { NextPageWithLayout } from "./_app";
import {MainLayout} from "layouts";
import {ReactElement} from "react";
import {Text} from "@chakra-ui/react";

const Home: NextPageWithLayout = () => {
  return (
   <>
       <Text fontSize='6xl'>خانه</Text>
   </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Home;
