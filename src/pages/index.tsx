import { useRouter } from "next/router";
import { useEffect } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head"; // ✅ Import Next.js Head for SEO
import instance from "../../interceptor";
import { useLoading } from "../context/LoadingContext";
import Loading from "../components/Skeleton/postSkeleton";
import PostList from "../components/postCard";

type Article = {
  title: string;
  description: string;
  url: string;
};

interface HomeProps {
  postList: Article[];
}

export default function Home({ postList }: HomeProps) {
  const router = useRouter();
  const { setLoading } = useLoading();

  useEffect(() => {
    const handleRouteChange = () => setLoading(true);
    const handleRouteComplete = () => setLoading(false);

    router.events.on("routeChangeStart", handleRouteChange);
    router.events.on("routeChangeComplete", handleRouteComplete);
    router.events.on("routeChangeError", handleRouteComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
      router.events.off("routeChangeComplete", handleRouteComplete);
      router.events.off("routeChangeError", handleRouteComplete);
    };
  }, [router, setLoading]);

  return (
    <>
    
      <Head>
        <title>Latest News & Top Headlines | News Article </title>
        <meta name="description" content="Stay updated with the latest headlines, news, and insights on News Article." />
        <meta name="keywords" content="news, headlines, latest news, business, startups" />
        <meta name="robots" content="index, follow" />

       
        <meta property="og:title" content="Latest News & Top Headlines | News Article" />
        <meta property="og:description" content="Stay updated with the latest headlines, news, and insights on News Article." />
        <meta property="og:image" content="/default-image.jpg" />
        <meta property="og:type" content="website" />

       
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Latest News & Top Headlines | News Article" />
        <meta name="twitter:description" content="Stay updated with the latest headlines, news, and insights on News Article." />
        <meta name="twitter:image" content="/default-image.jpg" />
        <meta name="twitter:site" content="@News Article" />

      </Head>

      <Loading />
      <PostList postList={postList} slug={""} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await instance.get("/top-headlines", {
      params: {
        page: 1,
        pageSize: 10,
      },
    });

    return {
      props: {
        postList: response.data.articles || [],
      },
    };
  } catch (error) {
    console.error("Error fetching news:", error);
    return {
      props: {
        postList: [],
      },
    };
  }
};
