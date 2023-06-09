import '../../css/search.css';

function Search () {

  return (
    <search className="search">
      <div className="wrapper">
        <form action="" method="GET">
          <input type="search" name="search" id="search"/>
          <input type="submit" placeholder="I`m looking for..." value="Search"/>
        </form>
      </div>
    </search>
  );
}

export default Search;
