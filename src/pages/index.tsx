
import { useRouter } from "next/router";
import { useEffect } from "react";
import { GetServerSideProps } from "next";
import instance from "../../interceptor";
import { useLoading } from "../context/LoadingContext";
import Loading from "../components/Skeleton/postSkeleton";
import PostList from "../components/postCard"


type Article = {
  title: string;
  description: string;
  url: string;
};

interface HomeProps {
  postList: Article[];
  page: number;
}

export default function Home({ postList,  }: HomeProps) {
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
      <Loading />
      <PostList postList={postList} slug={""} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await instance.get("/top-headlines", {
      params: {
        page:1,
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





