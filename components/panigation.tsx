
interface Props{
  currentPage: any,
  changePage: any,
  prePage:any,
  numbers:any,
  nextPage: any
}
const Pagination = (
 { currentPage,
  changePage,
  prePage,
  numbers,
  nextPage}: Props
) => {

  return (
   <div className="flex justify-content-center  w-100">
     <nav>
    <ul className="pagination mt-3">
      <li className="page-item">
        <span className="page-link cursor-pointer" onClick={prePage}>
          Prev
        </span>
      </li>
      {numbers.map((n:number, i:number) => (
        <li
          className={`page-item ${currentPage === n ? "active" : ""}`}
          key={i}
        >
          <span
           
            className="page-link cursor-pointer"
            onClick={() => changePage(n)}
          >
            {n}
          </span>
        </li>
      ))}
      <li className="page-item">
        <span className="page-link cursor-pointer" onClick={nextPage}>
          Next
        </span>
      </li>
    </ul>
  </nav>
   </div>
  );
  
};
export default Pagination;
