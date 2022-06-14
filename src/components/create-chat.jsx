import React, {useState} from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import {IconButton, Slide} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import Api from "../generic-services/api";
import AddCommentIcon from "@mui/icons-material/AddComment";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function CreateChat (props) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);

  let {id} = useParams();
  let dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function searchUsers() {
    if (!search) return;
    Api.execute(`/api/user/public?search=${search}`, 'get', {}, false).then((res) => {
      setUsers(res.data);
    }).catch(err => {
      console.log(err);
    })
  }

  function newChat(email) {
    Api.execute(`/api/chat`, 'post', {}, false).then((res) => {

      Api.execute(`/api/chat/${res.data.id}/participants`, 'post', {
        users: [
            email
        ]
      }, false).then((res) => {
        handleClose();
      }).catch(err => {
        console.log(err);
      })

    }).catch(err => {
      console.log(err);
    })
  }

  return (
      <div>
        <IconButton variant="contained" onClick={handleClickOpen} className={"w-12 h-12"}>
          <AddCommentIcon/>
        </IconButton>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title"
                fullWidth

                TransitionComponent={Transition}
        >
          <DialogTitle id="form-dialog-title">Create Poll</DialogTitle>
          <DialogContent className="!pb-2">
            <DialogContentText>
              Fill the detail to add poll
            </DialogContentText>
            <ValidatorForm onSubmit={searchUsers} className="space-y-4 mt-4">
              <div className={"space-x-4 flex items-center"}>
                <TextValidator
                    id="search"
                    fullWidth
                    label="Search Users"
                    className={"!w-[420px]"}
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    validators={['required']}
                    errorMessages={['This field is required']}
                />
                <Button color="primary" variant={"contained"} type="submit">
                  Search
                </Button>
              </div>
            </ValidatorForm>
            <div>
              <h3 className={"text-gray-800 font-semibold my-5"}>Users</h3>
              <div className={"space-y-2"}>
                {users && users.length ? users.map(u => (
                  <div key={u.id} className={"flex justify-between items-center border border-1 border-gray-200 p-2 rounded"}>
                    <h1>{u.name}</h1>
                    <Button variant={"contained"} onClick={() => {newChat(u.email)}}>Start Chat</Button>
                  </div>
                )): <div className={"text-gray-500"}>{search ? "No user found with the given keyword" : "Please seach to find users"}</div>
                }
              </div>
            </div>
            <DialogActions className="mt-4">
              <Button onClick={handleClose} color="primary">
                Close
              </Button>
              {/*<Button color="primary" variant={"contained"} type="submit">*/}
              {/*  Post Poll*/}
              {/*</Button>*/}
            </DialogActions>
          </DialogContent>
        </Dialog>
      </div>
  )
}
