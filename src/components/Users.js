import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaUserPlus, FaEdit, FaTrash, FaUserShield } from 'react-icons/fa';
import { getItem, setItem } from '../utils/localStorage';
import { mockUsers } from '../utils/mockData';

const Container = styled.div`
  max-width: 100%;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid #f0f0f0;
`;
const Title = styled.h1`
  color: #333;
  margin: 0;
  font-size: 2rem;
`;
const AddButton = styled.button`
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(34, 197, 94, 0.3);
  }
`;
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;
const Th = styled.th`
  background: #f8f9fa;
  color: #333;
  font-weight: 600;
  padding: 15px;
  text-align: left;
`;
const Td = styled.td`
  padding: 15px;
  border-bottom: 1px solid #f0f0f0;
  color: #666;
`;
const ActionButton = styled.button`
  background: #f0f0f0;
  color:rgb(83, 188, 118);
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  margin-right: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  &:hover {
    background:rgb(54, 180, 54);
    color: white;
  }
`;
const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;
const Modal = styled.div`
  background: white;
  padding: 40px 48px;
  border-radius: 20px;
  min-width: 400px;
  max-width: 600px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
  position: relative;
  @media (max-width: 600px) {
    min-width: 90vw;
    padding: 20px 8px;
  }
`;
const ModalTitle = styled.h2`
  margin: 0 0 24px 0;
  color: #14532d;
  font-size: 1.3rem;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
`;
const Input = styled.input`
  width: 100%;
  padding: 14px 18px;
  border: 2px solid #e1e5e9;
  border-radius: 10px;
  font-size: 1.05rem;
  margin-bottom: 18px;
  background: #f8f9fa;
  transition: all 0.2s;
  &:focus {
    outline: none;
    border-color: #22c55e;
    background: #fff;
    box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.08);
  }
`;
const Select = styled.select`
  width: 100%;
  padding: 14px 18px;
  border: 2px solid #e1e5e9;
  border-radius: 10px;
  font-size: 1.05rem;
  margin-bottom: 18px;
  background: #f8f9fa;
  transition: all 0.2s;
  &:focus {
    outline: none;
    border-color: #22c55e;
    background: #fff;
  }
`;
const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
  justify-content: flex-end;
  margin-top: 32px;
`;
const SaveButton = styled.button`
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  color: white;
  border: none;
  padding: 14px 32px;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;
  font-size: 1.05rem;
  box-shadow: 0 2px 10px rgba(34, 197, 94, 0.08);
  transition: all 0.2s;
  &:hover {
    transform: translateY(-2px) scale(1.03);
    box-shadow: 0 8px 24px rgba(34, 197, 94, 0.18);
  }
`;
const CancelButton = styled.button`
  background: #e74c3c;
  color: white;
  border: none;
  padding: 14px 32px;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;
  font-size: 1.05rem;
  box-shadow: 0 2px 10px rgba(231, 76, 60, 0.08);
  transition: all 0.2s;
  &:hover {
    transform: translateY(-2px) scale(1.03);
    box-shadow: 0 8px 24px rgba(231, 76, 60, 0.18);
  }
`;

function Users() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [form, setForm] = useState({ username: '', password: '', role: 'editor', name: '', email: '', status: 'active' });

  useEffect(() => {
    let stored = getItem('users');
    if (!stored) {
      setItem('users', mockUsers);
      stored = mockUsers;
    }
    setUsers(stored);
  }, []);

  const openAddModal = () => {
    setEditUser(null);
    setForm({ username: '', password: '', role: 'editor', name: '', email: '', status: 'active' });
    setShowModal(true);
  };
  const openEditModal = (user) => {
    setEditUser(user);
    setForm(user);
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    setEditUser(null);
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSave = () => {
    let updated;
    if (editUser) {
      updated = users.map(u => u.id === editUser.id ? { ...form, id: editUser.id } : u);
    } else {
      updated = [...users, { ...form, id: Date.now(), createdAt: new Date().toISOString().slice(0,10) }];
    }
    setUsers(updated);
    setItem('users', updated);
    closeModal();
  };
  const handleDelete = (id) => {
    const updated = users.filter(u => u.id !== id);
    setUsers(updated);
    setItem('users', updated);
  };

  return (
    <Container>
      <Header>
        <Title>User Management</Title>
        <AddButton onClick={openAddModal}><FaUserPlus /> Add User</AddButton>
      </Header>
      <Table>
        <thead>
          <tr>
            <Th>Name</Th>
            <Th>Username</Th>
            <Th>Email</Th>
            <Th>Role</Th>
            <Th>Status</Th>
            <Th>Created</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <Td>{user.name}</Td>
              <Td>{user.username}</Td>
              <Td>{user.email}</Td>
              <Td>{user.role}</Td>
              <Td>{user.status}</Td>
              <Td>{user.createdAt}</Td>
              <Td>
                <ActionButton onClick={() => openEditModal(user)}><FaEdit /></ActionButton>
                <ActionButton onClick={() => handleDelete(user.id)}><FaTrash /></ActionButton>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
      {showModal && (
        <ModalOverlay>
          <Modal>
            <ModalTitle>{editUser ? 'Edit User' : 'Add User'}</ModalTitle>
            <Input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} />
            <Input name="username" placeholder="Username" value={form.username} onChange={handleChange} />
            <Input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
            <Input name="password" placeholder="Password" value={form.password} onChange={handleChange} type="password" />
            <Select name="role" value={form.role} onChange={handleChange}>
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
              <option value="viewer">Viewer</option>
            </Select>
            <Select name="status" value={form.status} onChange={handleChange}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </Select>
            <ButtonGroup>
              <CancelButton onClick={closeModal}>Cancel</CancelButton>
              <SaveButton onClick={handleSave}>{editUser ? 'Save' : 'Add'}</SaveButton>
            </ButtonGroup>
          </Modal>
        </ModalOverlay>
      )}
    </Container>
  );
}

export default Users; 