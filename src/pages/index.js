import React from 'react';

import Providers from '@components/Providers';
import Layout from '@components/Layout';
import BackgroundStars from '@components/BackgroundStars';
import Head from '@components/Head';
import CustomerChat from '@components/CustomerChat';
import HomePage from '@scenes/HomePage';

const Home = () => {
  return (
    <Providers>
      <BackgroundStars />
      <CustomerChat />
      <Layout>
        <Head>
          <title>Home - Halo Lab Blog</title>
        </Head>
        <HomePage />
      </Layout>
    </Providers>
  );
};

export default Home;
