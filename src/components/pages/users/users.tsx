import React, { useState, useEffect } from 'react';
import { getAllUsers } from 'services/userService';
import { User } from 'services/userServiceTypes';
import styles from './Users.module.scss';
export default function Users() {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const bgColor = ['#FAEA73', '#F7CEDC', '#CCEFF6'];
  useEffect(() => {
    getAllUsers().then((users) => setAllUsers(users));
  }, []);
  return (
    <div className={styles.users}>
      <div className="container" data-testid="users">
        <div className={styles.wrapper}>
          {allUsers.map((user, index) => (
            <div
              className={styles.userCard}
              key={user.id}
              style={{ backgroundColor: bgColor[index < 3 ? index : Math.floor(index % 3)] }}
            >
              <h5>{user.name}</h5>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
