import React, { useRef, useState } from 'react'
import Link from 'next/link';
import categoryList from './category'
import { useRouter } from 'next/router'


function Category() {

    const [isFirstButtonVisible, setIsFirstButtonVisible] = useState(false);
    const [isLastButtonVisible, setIsLastButtonVisible] = useState(true);
    const scrollableDivRef = useRef(null);
    const router = useRouter()

    const handleScroll = () => {
        const scrollDiv = scrollableDivRef.current;
        const isScrolledToStart = scrollDiv.scrollLeft === 0;
        const isScrolledToEnd = scrollDiv.scrollLeft + scrollDiv.clientWidth === scrollDiv.scrollWidth;
        setIsFirstButtonVisible(!isScrolledToStart);
        setIsLastButtonVisible(!isScrolledToEnd);
    };
    const handleScrollLeft = () => {
        const scrollDiv = scrollableDivRef.current;
        scrollDiv.scrollLeft -= 100
    };

    const handleScrollRight = () => {
        const scrollDiv = scrollableDivRef.current;
        scrollDiv.scrollLeft += 100

    };

    const handleCategoryParent = async () => {
        localStorage.removeItem('article')
    }
    return (
        <>

            <nav className="sticky top-20 bg-white shadow-1 z-10 lg:px-10 px-5 flex items-center gap-6 h-20 leading-normal dark:bg-dark-1">
                {isFirstButtonVisible && <>
                    <button className=" subNav-scrollBtn light min-w-[30px] min-h-[30px] border rounded-full border-gray-1 grid place-items-center dark:border-none" onClick={handleScrollLeft} disabled={!isFirstButtonVisible}>
                        <img
                            src="/img/scrollArrow.svg"
                            alt=""
                            className="dark:hidden"
                            style={{ transform: "rotate(180deg)" }}
                            width={15}
                            height={10}
                        />
                        <img
                            src="/img/scrollArrow-dark.svg"
                            alt=""
                            className="dark:block hidden"
                            style={{ transform: "rotate(180deg)" }}
                            width={24}
                            height={24}
                        />
                    </button>
                </> }
                <div className=" flex gap-8 items-center basis-full overflow-hidden" onScroll={handleScroll} ref={scrollableDivRef}>
                    {categoryList && categoryList?.map((category, index) => (<>
                        <Link href={`/${category.categorySlug}`}
                            className={router?.query?.categoryslug == category.categorySlug ? "border-black dark:border-white group flex flex-col gap-2 items-center py-4 w-fit border-b-2   hover:border-black dark:hover:border-white" : "group flex flex-col gap-2 items-center pt-2 pb-1 w-fit border-b-2  border-transparent hover:border-black dark:hover:border-white "}
                            key={index} style={{ backgroundImage: "/img/backdrop.svg" }}
                            onClick={(e) => handleCategoryParent(index, category)}
                        >
                            <p  className={router?.query?.categoryslug == category.categorySlug ? " text-black dark:text-[#FFFFFF] group-hover:text-black  text-xs leading-normal whitespace-nowrap dark:text-[#8E8E8E]   dark:group-hover:text-[#FFFFFF]" : "group-hover:text-black text-grey-2 text-xs leading-normal whitespace-nowrap dark:text-[#8E8E8E]   dark:group-hover:text-[#FFFFFF]  "
                            }

                                onClick={(e) => handleCategoryParent(index, category)}>
                                {category?.categoryName}
                            </p>
                        </Link>
                    </>))}


                </div>


                {isLastButtonVisible && <> <button className="subNav-scrollBtn light min-w-[30px] min-h-[30px] border rounded-full border-gray-1 grid place-items-center dark:border-none" onClick={handleScrollRight} disabled={!isLastButtonVisible}>
                    <img
                        src="/img/scrollArrow.svg"
                        alt=""
                        className="dark:hidden"
                        width={15}
                        height={10}
                    />
                    <img
                        src="/img/scrollArrow-dark.svg"
                        alt=""
                        className="dark:block hidden"
                        width={24}
                        height={24}
                    />
                </button></>}
            </nav>


        </>

    )
}

export default Category
