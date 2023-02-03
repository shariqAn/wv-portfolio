import { Link, Redirect } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CircularProgress from "@material-ui/core/CircularProgress";
import CreateBoard from "../other/CreateBoard";
import Navbar from "../other/Navbar";
import { getBoards } from "../../actions/board";

const Dashboard = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const boards = useSelector((state) => state.board.boards);
  const loading = useSelector((state) => state.board.dashboardLoading);
  const dispatch = useDispatch();
  console.log("boards", boards)

  useEffect(() => {
    dispatch(getBoards());
  }, [dispatch]);

  useEffect(() => {
    document.title = "Your Boards | Project Calendar";
  }, []);

  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="dashboard-and-navbar">
      <Navbar />
      <section className="dashboard">
        <h1>Welcome {user && user.name}</h1>
        <h2>Your Boards</h2>
        {loading && <CircularProgress className="dashboard-loading" />}
        <div className="boards">
          {boards && boards.map((board) => (
            <Link
              key={board?._id}
              to={`/board/${board?._id}`}
              className="board-card"
            >
              {board?.title}
            </Link>
          ))}
          <CreateBoard />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
