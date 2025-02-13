
import { GetServerSideProps } from 'next';
import PostList from '../../components/postCard';
import instance from '../../../interceptor';
import Loading from '../../components/Skeleton/postSkeleton'
import { useRouter } from 'next/router';
import { useLoading } from '@/context/LoadingContext';
import { useEffect } from 'react';
import categoryList from '../../components/Category/category'

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

  return(<>
   <Loading />
  <PostList postList={postList} slug={categoryslug} />;
  </>) 
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const categoryslug = context.params?.categoryslug || '';

  const categoryExists = categoryList.some((category) => category.categorySlug === categoryslug);

  if (!categoryExists) {
    return { notFound: true }; 
  }

  try {
    const response = await instance.get('/top-headlines', {
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
    console.error('Error fetching news:', error);
    return {
      props: {
        postList: [],
        categoryslug,
      },
    };
  }
};
