
import React from "react";

export const Pagination = ({currentLimitMusic, totalMusic, paginate, setCurrentMusic}) => {

    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(totalMusic/currentLimitMusic); i++) {
        pageNumbers.push(i)
    }
    
    const nextPage = () => {
        setCurrentMusic(next => next + 1)
    }
    const prevPage = () => {
         setCurrentMusic(prev => prev - 1)
            }
       
    return (
        <div class="max-w-2xl mt-20 mx-auto">
        <nav aria-label="Page navigation example" style={{textAlign: "center"}}>
        <ul class="inline-flex -space-x-px">
        <li>
				<a href="" onClick={prevPage} 
					class="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ml-0 rounded-l-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
			</li>
                {
                    pageNumbers.map((number,idx) => (
                        // <li className="pagination__item" key={idx}>
                        //     <Link className='pagination__link' onClick={() => {paginate(number)}}>
                        //         {number}
                        //     </Link>

                        // </li>
                      
                            <li>
                                <a href="" onClick={() => {paginate(number)}}
                                    class="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{number}</a>
                            </li>
                           
                  
                    ))
                }
                <li>
				<a href="" onClick={nextPage}
					class="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-r-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
			</li>
               </ul>
                    </nav >
                    </div>
    )
}