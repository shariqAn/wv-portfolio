import { Box, CircularProgress } from "@material-ui/core";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import React, { Fragment, useEffect } from "react";
import { getBoard, moveCard, moveList } from "../../actions/board";
import { useDispatch, useSelector } from "react-redux";

import BoardDrawer from "../board/BoardDrawer";
import BoardTitle from "../board/BoardTitle";
import CreateList from "../board/CreateList";
import List from "../list/List";
import Members from "../board/Members";
import Navbar from "../other/Navbar";
import { Redirect } from "react-router-dom";
import bg from "../../assets/BG.png";

const Board = ({ match }) => {
  const board = useSelector((state) => state.board.board);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBoard(match.params.id));
  }, [dispatch, match.params.id]);

  useEffect(() => {
    if (board?.title) document.title = board.title + " | Project Calendar";
  }, [board?.title]);

  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }

  const onDragEnd = (result) => {
    const { source, destination, draggableId, type } = result;
    if (!destination) {
      return;
    }
    if (type === "card") {
      dispatch(
        moveCard(draggableId, {
          fromId: source.droppableId,
          toId: destination.droppableId,
          toIndex: destination.index,
        })
      );
    } else {
      dispatch(moveList(draggableId, { toIndex: destination.index }));
    }
  };

  return !board ? (
    <Fragment>
      <Navbar />
      <Box className="board-loading">
        <CircularProgress />
      </Box>
    </Fragment>
  ) : (
    <div
      className="board-and-navbar"
      style={{
        backgroundImage:
          "url(" + (board.backgroundURL ? board.backgroundURL : bg) + ")",
      }}
    >
      <Navbar />
      <section className="board">
        <div className="board-top">
          <div className="board-top-left">
            <BoardTitle board={board} />
            <Members />
          </div>
          <BoardDrawer />
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="all-lists" direction="horizontal" type="list">
            {(provided) => (
              <div
                className="lists"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {board?.lists?.map((listId, index) => (
                  <List key={listId} listId={listId} index={index} />
                ))}
                {provided?.placeholder}
                <CreateList />
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </section>
    </div>
  );
};

export default Board;
