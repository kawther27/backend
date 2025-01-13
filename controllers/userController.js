import User from '../models/user.js';

// Retrieve all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    if (!users || users.length === 0) return res.status(404).json({ message: 'No users found' });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

// Retrieve a specific user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
};

// Update a user's information
export const updateUser = async (req, res) => {
  try {
    console.log('Updating user with ID:', req.params.id);
    console.log('Request body:', req.body);
    const updatedUser = await User.update(req.body, {
      where: { id: req.params.id },
    });
    console.log('Update Result:', updatedUser); // Debug update result

    if (!updatedUser[0]) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.destroy({
      where: { id: req.params.id },
    });
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
};
