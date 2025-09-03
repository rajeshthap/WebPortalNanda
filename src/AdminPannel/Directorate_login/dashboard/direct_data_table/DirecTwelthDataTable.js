import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import "../../direc_assets/css/DirectTwelthDataTable.css";
function DirecTwelthDataTable() {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  const getCountries = async () => {
    try {
      const response = await axios.get("https://restcountries.com/v2/all");
      setCountries(response.data);
      setFilteredCountries(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  // ]
  const columns = [
   
    {
      name: "S.No",
      selector: (row) => row.name,
      sortable: true,
      
    },

    {
      name: "District",
      selector: (row) => row.nativeName,
      sortable: true,
    },
    {
      name: "Received",
      selector: (row) => row.capital || "N/A",
    },
    {
      name: "Approved by CDPO",
      selector: (row) => (
        <img src={row.flags.png} alt="flag" width={20} height={12} />
      ),
    },
    {
      name: "Rejected by CDPO",
      selector: (row) => (
        <img src={row.flags.png} alt="flag" width={20} height={12} />
      ),
    },
    {
      name: "	Pending",
      cell: (row) => (
        <button
          className="btn btn-primary"
          onClick={() => alert(row.alpha2Code)}
        >
          Edit
        </button>
      ),
    },
  ];

  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    const results = countries.filter((country) =>
      country.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredCountries(results);
  }, [search, countries]);

  return (
    <>
      <DataTable
        title="Country List"
        columns={columns}
        // columns1={columns1}
        data={filteredCountries}
        pagination
        fixedHeader
        // fixedHeaderScrollHeight="400px"
        ReactSmartScroller="400px"
        selectableRows
        selectableRowsHighlight
        highlightOnHover
        // actions={<button className="btn btn-sm btn-primary">Export</button>}
        subHeader
        subHeaderComponent={
          // <input
          //   type="text"
          //   placeholder="Search"
          //   className="form-control w-25"
          //   value={search}
          //   onChange={(e) => setSearch(e.target.value)}
          // />

          <div className="direct-twelth-table">
            
            <div class="search-container">
              <form>
                <input
                  class="search"
                  id="searchleft"
                  type="search"
                  name="q"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <label class="button search-btn " for="searchleft">
                  <span class="mglass">&#9906;</span>
                </label>
              </form>
            </div>
            <button className="btn btn-primary direc-cp-btn">Copy</button>
           
          </div>
          
        }
        subHeaderAlign="left"
      />
    </>
  );
}

export default DirecTwelthDataTable;
