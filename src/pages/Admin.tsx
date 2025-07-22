import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Package, DollarSign, Users, ShoppingCart } from 'lucide-react';
import { products as initialProducts } from '../data/products';
import toast from 'react-hot-toast';

const Admin: React.FC = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState(initialProducts);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: 0,
    image: '',
    category: 'Electronics',
    description: '',
    inStock: true
  });

  // Redirect if not admin
  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      toast.error('Please fill in all required fields');
      return;
    }

    const product = {
      ...newProduct,
      id: Date.now().toString(),
      rating: 4.5,
      reviews: 0
    };

    setProducts([...products, product]);
    setNewProduct({
      name: '',
      price: 0,
      image: '',
      category: 'Electronics',
      description: '',
      inStock: true
    });
    setShowAddProduct(false);
    toast.success('Product added successfully!');
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
    toast.success('Product deleted successfully!');
  };

  const stats = [
    {
      title: 'Total Products',
      value: products.length,
      icon: Package,
      color: 'text-blue-600'
    },
    {
      title: 'Total Revenue',
      value: '$12,345',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'Total Orders',
      value: '156',
      icon: ShoppingCart,
      color: 'text-purple-600'
    },
    {
      title: 'Total Users',
      value: '1,234',
      icon: Users,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your store products and view analytics
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-card rounded-lg shadow-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Products Management */}
      <div className="bg-card rounded-lg shadow-card">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Products Management</h2>
            <button
              onClick={() => setShowAddProduct(!showAddProduct)}
              className="btn-primary flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Product
            </button>
          </div>
        </div>

        {/* Add Product Form */}
        {showAddProduct && (
          <div className="p-6 border-b border-border bg-muted/30">
            <h3 className="text-lg font-semibold mb-4">Add New Product</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Product Name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                className="input-field"
              />
              <input
                type="number"
                placeholder="Price"
                value={newProduct.price || ''}
                onChange={(e) => setNewProduct({...newProduct, price: Number(e.target.value)})}
                className="input-field"
              />
              <input
                type="url"
                placeholder="Image URL"
                value={newProduct.image}
                onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                className="input-field"
              />
              <select
                value={newProduct.category}
                onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                className="input-field"
              >
                <option value="Electronics">Electronics</option>
                <option value="Fashion">Fashion</option>
                <option value="Home & Garden">Home & Garden</option>
                <option value="Beauty">Beauty</option>
                <option value="Food & Beverages">Food & Beverages</option>
                <option value="Sports">Sports</option>
              </select>
              <textarea
                placeholder="Product Description"
                value={newProduct.description}
                onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                className="input-field md:col-span-2 min-h-[100px]"
              />
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={newProduct.inStock}
                  onChange={(e) => setNewProduct({...newProduct, inStock: e.target.checked})}
                  className="rounded"
                />
                <label className="text-sm">In Stock</label>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button onClick={handleAddProduct} className="btn-primary">
                Add Product
              </button>
              <button 
                onClick={() => setShowAddProduct(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Products Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border">
              <tr>
                <th className="text-left p-4">Product</th>
                <th className="text-left p-4">Category</th>
                <th className="text-left p-4">Price</th>
                <th className="text-left p-4">Stock</th>
                <th className="text-left p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-border hover:bg-muted/50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                          {product.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">{product.category}</td>
                  <td className="p-4 font-semibold">${product.price.toFixed(2)}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      product.inStock 
                        ? 'bg-success/10 text-success' 
                        : 'bg-destructive/10 text-destructive'
                    }`}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingProduct(product.id)}
                        className="p-2 hover:bg-muted rounded-lg transition-[var(--transition-fast)]"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="p-2 hover:bg-muted rounded-lg transition-[var(--transition-fast)] text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;