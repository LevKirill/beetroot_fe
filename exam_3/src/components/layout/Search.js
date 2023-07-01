import '../../scss/search.scss';

function Search () {

  return (
    <search className="search">
      <div className="wrapper">
        <form action="" className="search_form" method="GET">
          <input type="search" name="search" id="search"/>
          <input type="submit" placeholder="I`m looking for..." value="Search"/>
        </form>
      </div>
    </search>
  );
}

export default Search;
