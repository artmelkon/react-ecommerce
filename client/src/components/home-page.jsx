import React, { Fragment } from "react";
import Layout from "./shared/layout";
import Hero from "./hero";
import MainSeciton from "./main-section";
import FeatuedCollection from "./featured-collection";

const HomePage = () => {
  return (
    <Fragment>
      <Layout>
        <Hero />
        <MainSeciton />
        <FeatuedCollection />
      </Layout>
    </Fragment>
  );
};

export default HomePage;
