import "./index.css";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Loading from "./Loading";
import { nanoid } from "nanoid";

function App() {
  const [users, setUsers] = useState([]);
  const [main, setMain] = useState([]);
  const [sortacs, setSortasc] = useState([]);
  const [sortdsc, setSortdsc] = useState([]);
  const [searched, setSearched] = useState([]);

  const [isloading, setIsloading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [showTable, setShowTable] = useState(true);
  const [totalUsers, setTotalUsers] = useState(10);
  const [usersPerPage, setUsersPerPage] = useState(3);

  const [textSearch, setTextSearch] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");

  const [showEdit, setShowEdit] = useState(true);
  const [editIndexMain, setEditIndexMain] = useState("");
  const [editIndexUsers, setEditIndexUsers] = useState("");
  const addBtn = useRef();
  function getData() {
    setIsloading(true);
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => {
        setUsers(json);
        setMain(json);
        setIsloading(false);
      });
  }

  useEffect(() => {
    getData();
  }, []);
  // Good soloution to stop initial render on useLayoutEffect
  const firstUpdate = useRef(true);
  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    if (currentUsers == 0) {
      setCurrentPage(pageNumbers.length);
    }
  });

  const totalUsersarr = [];
  for (let i = 1; i <= totalUsers; i++) {
    totalUsersarr.push(i);
  }

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = main.slice(indexOfFirstUser, indexOfLastUser);
  console.log(currentUsers.length);

  const usersList = currentUsers.map((user) => {
    return (
      <tr
        key={user.id}
        className="container-fluid"
        style={{ fontSize: "1.7vw" }}
      >
        <th scope="row">{user.name}</th>
        <td>{user.username}</td>
        <td>{user.email}</td>
        <td style={{ fontSize: "1.5vw" }}>{user.phone}</td>
        <td>
          {showEdit && (
            <button
              style={{
                fontSize: "1.5vw",

                minWidth: "7vw",
                justifyContent: "center",
              }}
              id={user.id}
              type="button"
              className="btn btn-warning me-2 "
            >
              <small onClick={handleEdit}>Edit</small>
            </button>
          )}
          {showEdit && (
            <button
              style={{
                fontSize: "1.5vw",

                minWidth: "7vw",
                justifyContent: "center",
              }}
              id={user.id}
              type="button"
              className="btn btn-danger"
              onClick={() => handleDelete(user.id)}
            >
              <small>Delete</small>
            </button>
          )}
        </td>
      </tr>
    );
  });

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  let paginate;

  if (pageNumbers.length >= 6) {
    if (
      currentPage == 1 ||
      currentPage == 2 ||
      currentPage == pageNumbers.length ||
      currentPage == pageNumbers.length - 1
    ) {
      paginate = [
        <li
          key={nanoid()}
          className="page-item"
          onClick={(e) => {
            e.target.color = "yellow";
            setCurrentPage(1);
          }}
        >
          <a className="page-link" href="#">
            1
          </a>
        </li>,
        <li
          key={nanoid()}
          className="page-item"
          onClick={() => setCurrentPage(2)}
        >
          <a className="page-link" href="#">
            2
          </a>
        </li>,
        <span key={nanoid()} className="between">
          . . .
        </span>,
        <li
          key={nanoid()}
          className="page-item"
          onClick={() => setCurrentPage(pageNumbers.length - 1)}
        >
          <a className="page-link" href="#">
            {pageNumbers.length - 1}
          </a>
        </li>,
        <li
          key={nanoid()}
          className="page-item"
          onClick={() => setCurrentPage(pageNumbers.length)}
        >
          <a className="page-link" href="#">
            {pageNumbers.length}
          </a>
        </li>,
      ];
    } else {
      paginate = [
        <li
          key={nanoid()}
          className="page-item"
          onClick={() => setCurrentPage(1)}
        >
          <a className="page-link" href="#">
            1
          </a>
        </li>,

        <span key={nanoid()} className="between">
          . . .
        </span>,
        <li
          key={nanoid()}
          className="page-item"
          onClick={() => setCurrentPage(2)}
        >
          <a className="page-link" href="#">
            {currentPage - 1}
          </a>
        </li>,
        <li
          key={nanoid()}
          className="page-item"
          onClick={() => setCurrentPage(2)}
        >
          <a className="page-link" href="#">
            {currentPage}
          </a>
        </li>,
        <li
          key={nanoid()}
          className="page-item"
          onClick={() => setCurrentPage(2)}
        >
          <a className="page-link" href="#">
            {currentPage + 1}
          </a>
        </li>,
        <span key={nanoid()} className="between">
          . . .
        </span>,
        <li
          key={nanoid()}
          className="page-item"
          onClick={() => setCurrentPage(pageNumbers.length)}
        >
          <a className="page-link" href="#">
            {pageNumbers.length}
          </a>
        </li>,
      ];
    }
  } else {
    paginate = pageNumbers.map((number) => (
      <li
        key={number}
        className="page-item"
        onClick={() => setCurrentPage(number)}
      >
        <a className="page-link" href="#">
          {number}
        </a>
      </li>
    ));
  }

  function handleDelete(id) {
    let copyUsers = [...users];
    const showUsers = copyUsers.filter((copyUser) => {
      return copyUser.id !== id;
    });

    setUsers(showUsers);
    setMain(showUsers);
    setTotalUsers(totalUsers - 1);
  }

  function handleEdit(e) {
    setShowEdit(false);
    e.target.parentElement.parentElement.parentNode.style.backgroundColor =
      "Yellow";
    users.find((user, index) => {
      if (
        user.name ===
        e.target.parentElement.parentElement.parentNode.children[0].innerText
      ) {
        setEditIndexUsers(index);
      }
    });

    main.find((user, index) => {
      if (
        user.name ===
        e.target.parentElement.parentElement.parentNode.children[0].innerText
      ) {
        setName(user.name);
        setUsername(user.username);
        setEmail(user.email);
        setPhonenumber(user.phone);
        addBtn.current.innerText = "Modify";

        setEditIndexMain(index);
      }
    });
  }

  function handleAdd(e) {
    if (e.target.innerText === "Add") {
      if (
        name === "" &&
        username === "" &&
        email === "" &&
        phonenumber === ""
      ) {
        return;
      } else {
        const obj = {
          id: nanoid(),
          name: `${name}`,
          username: `${username}`,
          email: `${email}`,
          phone: `${phonenumber}`,
        };
        setUsers([obj, ...users]);
        setMain([obj, ...users]);
        setTotalUsers(totalUsers + 1);
        setShowTable(true);
        setName("");
        setUsername("");
        setEmail("");
        setPhonenumber("");
      }
    } else {
      e.target.innerText = "Add";
      setShowEdit(true);
      let edited = {
        name: name,
        username: username,
        email: email,
        phone: phonenumber,
      };

      let copyUsers = [...users];
      let copyMain = [...main];
      copyUsers.splice(editIndexUsers, 1, edited);
      copyMain.splice(editIndexMain, 1, edited);
      setMain(copyMain);
      setUsers(copyUsers);
      setName("");
      setUsername("");
      setEmail("");
      setPhonenumber("");
    }
  }

  function handlePrevious() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    } else {
      return;
    }
  }

  function handleNext() {
    if (currentPage !== pageNumbers.length) {
      setCurrentPage(currentPage + 1);
    } else {
      return;
    }
  }

  function handleSortAllUsers(e) {
    let copyMain = [...main];
    if (e.target.innerText === "Sort All Users asc") {
      copyMain.sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        } else if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      setMain(copyMain);
      setSortasc(copyMain);
      e.target.innerText = "Sort All Users dsc";
    } else {
      copyMain.reverse();
      setMain(copyMain);
      setSortdsc(copyMain);
      e.target.innerText = "Sort All Users asc";
    }
  }

  function handleSortDefault() {
    if (sortacs.length === 0) {
      return;
    } else {
      setMain(users);
    }
  }

  function handleSearch(e) {
    setTextSearch(e.target.value);
    let searchedarr = [];
    if (e.target.value === "") {
      setTotalUsers(users.length);
      setMain([...users]);
      console.log(searched);
    } else {
      users.forEach((user) => {
        if (
          user.name.toUpperCase().includes(e.target.value.toUpperCase()) ||
          user.username.toUpperCase().includes(e.target.value.toUpperCase()) ||
          user.email.toUpperCase().includes(e.target.value.toUpperCase()) ||
          user.phone.toUpperCase().includes(e.target.value.toUpperCase())
        ) {
          searchedarr.push(user);
        }
      });
      setTotalUsers(searchedarr.length);
      setMain(searchedarr);
      console.log(searched);
    }
  }

  return (
    <div className="App">
      {isloading ? (
        <Loading />
      ) : (
        <div className="container">
          <h2 className="users-table">Users Table</h2>
          <input
            type="text"
            placeholder="Search among all users..."
            value={textSearch}
            onChange={handleSearch}
          />
          {showTable ? (
            <>
              <table className="table table-hover table-responsive">
                <thead>
                  <tr style={{ fontSize: "1.8vw" }}>
                    <th scope="col">Name</th>
                    <th scope="col">User Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col">Functions</th>
                  </tr>
                </thead>
                <tbody>{usersList}</tbody>
              </table>
              <nav>
                <ul className="pagination">
                  <li className="page-item" onClick={handlePrevious}>
                    <a className="page-link" href="#">
                      <small>Previous</small>
                    </a>
                  </li>
                  {paginate}
                  <li className="page-item" onClick={handleNext}>
                    <a className="page-link" href="#">
                      <small>Next</small>
                    </a>
                  </li>
                </ul>
              </nav>
            </>
          ) : (
            <h4 className="no-user">No user available</h4>
          )}
          <div style={{ marginBottom: "2%" }}>
            {" "}
            {showEdit && (
              <button
                type="button"
                className="btn btn-secondary btn-sm ms-2"
                onClick={handleSortAllUsers}
                style={{ minWidth: "8vw", fontSize: "1.6vw" }}
              >
                <small>Sort All Users asc</small>
              </button>
            )}
            {showEdit && (
              <button
                type="button"
                className="btn btn-info btn-sm ms-2"
                onClick={handleSortDefault}
                style={{ minWidth: "8vw", fontSize: "1.6vw" }}
              >
                <small>Default</small>
              </button>
            )}
          </div>
          <select
            className="form-select form-select-sm"
            onChange={(e) => {
              if (Math.ceil(totalUsers / e.target.value) <= currentPage) {
                setCurrentPage(Math.ceil(totalUsers / e.target.value));
                setUsersPerPage(e.target.value);
              } else {
                setUsersPerPage(e.target.value);
              }
            }}
          >
            <option defaultValue>
              The number of users displayed on the page
            </option>
            {totalUsersarr.map((item) => {
              return <option value={item}>{item}</option>;
            })}
          </select>

          <h2 className="add-users">{showEdit ? "Add User" : "Edit User"}</h2>

          <div style={{ alignItems: "center", justifyContent: "center" }}>
            <div className="input-group mb-5">
              <div class="form-group  col-lg-3 col-md-12 col-sm-12">
                <label for="name">Name</label>
                <input
                  type="text"
                  class="form-control  "
                  id="name"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div class="form-group col-lg-3 col-md-12 col-sm-12">
                <label for="username">UserName</label>
                <input
                  type="text"
                  class="form-control   "
                  id="username"
                  placeholder="userName"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div class="form-group col-lg-3 col-md-12 col-sm-12">
                <label for="email">Email</label>
                <input
                  type="email"
                  class="form-control   "
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div class="form-group col-lg-3 col-md-12 col-sm-12">
                <label for="number">Email</label>
                <input
                  type="text"
                  class="form-control   "
                  id="number"
                  placeholder="Phone number"
                  value={phonenumber}
                  onChange={(e) => setPhonenumber(e.target.value)}
                  onBeforeInput={(e) => {
                    let newString = e.data;
                    console.log(typeof e.data);
                    if (isNaN(parseInt(newString))) {
                      e.preventDefault();
                    }
                  }}
                />
              </div>
            </div>
          </div>

          <div>
            <button
              className="btn btn-outline-secondary"
              type="button"
              id="button-addon1"
              onClick={handleAdd}
              ref={addBtn}
            >
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default App;
