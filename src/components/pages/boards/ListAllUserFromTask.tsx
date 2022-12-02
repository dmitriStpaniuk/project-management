import React, { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { blue } from '@mui/material/colors';
import { BiDotsVertical } from 'react-icons/bi';
import styles from './beautiful-dnd/Task.module.scss';
import { useAppDispatch, useAppSelector } from 'store/store';
import { getAllUsersList } from 'store/thunks/userThunk';

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}
type ListUserProps = {
  setNameUser: (x: string) => void;
};

function SimpleDialog(props: SimpleDialogProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllUsersList());
  }, []);

  const allUsers = useAppSelector((state) => state.user.allUsersList);

  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Select user</DialogTitle>
      <List>
        {allUsers
          ? allUsers.map((user) => (
              <ListItem button onClick={() => handleListItemClick(user.login)} key={user.id}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}></Avatar>
                </ListItemAvatar>
                <ListItemText primary={user.login} />
              </ListItem>
            ))
          : []}
      </List>
    </Dialog>
  );
}

export default function ListAllUserFromTask({ setNameUser }: ListUserProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setNameUser(value);
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <button onClick={handleClickOpen} className={styles.taskButton}>
        <BiDotsVertical />
      </button>
      <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} />
    </div>
  );
}
