import moment from "moment";
import React, { useEffect, useState } from "react";
import Head from "next/head"; // ✅ Import Next.js Head for SEO
import ImageComponent from "../../components/Image";
import NoDataFound from "../../utility/NoDataFound";

type Article = {
  title: string;
  author?: string;
  urlToImage?: string;
  publishedAt?: string;
  description?: string;
  content?: string;
  url?: string;
};

const ArticleDetail: React.FC = () => {
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedArticle = localStorage.getItem("article");
      if (storedArticle) {
        setArticle(JSON.parse(storedArticle));
      }
    }
  }, []);

  if (!article) return <NoDataFound />;

  return (
    <>

      <Head>
        <title>{article.title ? `${article.title} | News` : "Article | News"}</title>
        <meta name="description" content={article.description || "Read the latest article on News"} />
        <meta name="keywords" content="news, articles, latest news, business, startups" />
        <meta name="author" content={article.author || "News"} />
        <meta name="robots" content="index, follow" />

       
        <meta property="og:title" content={article.title || "News Article"} />
        <meta property="og:description" content={article.description || "Read the latest article on News"} />
        <meta property="og:image" content={article.urlToImage || "/default-image.jpg"} />
        <meta property="og:url" content={article.url} />
        <meta property="og:type" content="article" />

      
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title || "News Article"} />
        <meta name="twitter:description" content={article.description || "Read the latest article on News"} />
        <meta name="twitter:image" content={article.urlToImage || "/default-image.jpg"} />
        <meta name="twitter:site" content="@Newa-article" />



      </Head>

      <main className="min-h-screen p-4 max-w-screen-2xl m-auto dark:bg-dark-1">
        <div className="px-0 lg:px-[100px] pb-4 border-b border-gray-200 mb-6">
          <h3 className="text-black text-lightxl lg:text-4xl lg:leading-[45px] font-medium mb-4">
            {article.title}
          </h3>

          <ImageComponent
            src={article.urlToImage}
            width={500}
            height={500}
            alt={article.title || "Article Image"}
            className="w-full post-img rounded-lg"
          />

          <div className="flex justify-between items-center mt-4">
            <p className="text-black font-normal text-sm">{article.author || "Unknown Author"}</p>
            <p className="text-gray-500 text-xs font-light">
              {article.publishedAt ? moment(article.publishedAt).format("MMM DD, YYYY") : "N/A"}
            </p>
          </div>

          <div className="w-full h-px bg-gray-200 mt-4 mb-6"></div>

          <div className="mb-4">
            <h3 className="text-lightxl lg:text-2xl font-medium leading-7 text-black mb-2">
              Description
            </h3>
            <p className="text-gray-500 text-lightbase lg:text-base leading-6 font-normal">
              {article.description || "No description available."}
            </p>
          </div>

          <ImageComponent
            src={article.url}
            width={500}
            height={500}
            alt="Article Image"
            className="w-full post-img rounded-lg"
          />

          <div className="w-full h-px bg-gray-200 mt-4 mb-6"></div>

          <div className="mb-4">
            <h3 className="text-lightxl lg:text-2xl font-medium leading-7 text-black mb-2">
              Content
            </h3>
            <p className="text-gray-500 text-lightbase lg:text-base leading-6 font-normal">
              {article.content || "No content available."}
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default ArticleDetail;
