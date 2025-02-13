import { GetServerSideProps } from "next";
import Head from "next/head"; // ✅ Import Next.js Head for SEO
import { useEffect } from "react";
import { useRouter } from "next/router";
import PostList from "../../components/postCard";
import instance from "../../../interceptor";
import Loading from "../../components/Skeleton/postSkeleton";
import { useLoading } from "@/context/LoadingContext";
import categoryList from "../../components/Category/category";

type Article = {
  title: string;
  description: string;
  url: string;
};

interface CategoryProps {
  postList: Article[];
  categoryslug: string;
}

export default function CategoryPage({ postList, categoryslug }: CategoryProps) {
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
        <title>{categoryslug.charAt(0).toUpperCase() + categoryslug.slice(1)} News | Article</title>
        <meta
          name="description"
          content={`Read the latest news about ${categoryslug} on News | Article.`}
        />
        <meta name="keywords" content={`${categoryslug}, news, headlines, latest news`} />
        <meta name="robots" content="index, follow" />

       
        <meta property="og:title" content={`${categoryslug.charAt(0).toUpperCase() + categoryslug.slice(1)} News | Article`} />
        <meta property="og:description" content={`Read the latest news about ${categoryslug} on News | Article.`} />
        <meta property="og:image" content="/default-image.jpg" />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${categoryslug.charAt(0).toUpperCase() + categoryslug.slice(1)} News | Article`} />
        <meta name="twitter:description" content={`Read the latest news about ${categoryslug} on News | Article.`} />
        <meta name="twitter:image" content="/default-image.jpg" />
        <meta name="twitter:site" content="@News | Article" />

      </Head>

      <Loading />
      <PostList postList={postList} slug={categoryslug} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const categoryslug = context.params?.categoryslug || "";

  const categoryExists = categoryList.some((category) => category.categorySlug === categoryslug);

  if (!categoryExists) {
    return { notFound: true };
  }

  try {
    const response = await instance.get("/top-headlines", {
      params: {
        category: categoryslug,
        pageSize: 10,
        page: 1,
      },
    });

    return {
      props: {
        postList: response.data.articles || [],
        categoryslug,
      },
    };
  } catch (error) {
    console.error("Error fetching news:", error);
    return {
      props: {
        postList: [],
        categoryslug,
      },
    };
  }
};
