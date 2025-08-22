// src/pages/admin/TransactionsPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { PuffLoader } from "react-spinners"; 

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage] = useState(15);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/transactions`,
        );
        console.log("Fetched transactions:", data)
        
        // Sort transactions by createdAt in descending order (newest first)
        const sortedTransactions = Array.isArray(data.data) 
          ? data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          : [];
        
        setTransactions(sortedTransactions);
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      } catch (error) {
        setTransactions([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  // Calculate pagination
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);
  const totalPages = Math.ceil(transactions.length / transactionsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages is less than or equal to max visible
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Show limited pages with ellipsis
      if (currentPage <= 3) {
        // Show first 5 pages
        for (let i = 1; i <= 5; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Show last 5 pages
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        // Show current page with 2 pages on each side
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <PuffLoader color="#00c7fc" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-primary text-center">
        Transactions
      </h1>
      
      {/* Summary info */}
      <div className="mb-4 text-center text-gray-600">
        Showing {indexOfFirstTransaction + 1} to {Math.min(indexOfLastTransaction, transactions.length)} of {transactions.length} transactions
      </div>
      
      <div className="bg-white rounded shadow p-6 w-full mx-4 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 text-left">Txn ID</th>
              <th className="py-2 px-4 text-left">User</th>
              <th className="py-2 px-4 text-left">Product</th>
              <th className="py-2 px-4 text-left">Total Amount</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {currentTransactions.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-500">
                  No transactions found.
                </td>
              </tr>
            ) : (
              currentTransactions.map((txn) =>
                txn.products.map((prod, idx) => (
                  <tr key={txn._id + "-" + prod._id} className="border-b">
                    <td className="py-2 px-4">{txn.transactionId.slice(0, 20)}</td>
                    <td className="py-2 px-4">{(txn.userId || "N/A").toString().slice(0, 10)}</td>
                    <td className="py-2 px-4">{prod.name}</td>
                    <td className="py-2 px-4">${txn.totalAmount}</td>
                    <td className="py-2 px-4">
                      <span 
                        className={`px-3 py-1 rounded-full text-xs font-semibold
                          ${txn.paymentStatus === 'completed' ? 'bg-green-100 text-green-800' : ''}
                          ${txn.paymentStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                          ${txn.paymentStatus === 'failed' ? 'bg-red-100 text-red-800' : ''}
                        `}
                      >
                        {txn.paymentStatus.charAt(0).toUpperCase() + txn.paymentStatus.slice(1)}
                      </span>
                    </td>
                    <td className="py-2 px-4">
                      {new Date(txn.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-6">
          <nav className="flex items-center space-x-2">
            {/* Previous button */}
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                currentPage === 1
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              Previous
            </button>

            {/* Page numbers */}
            {getPageNumbers().map((number, index) => (
              <button
                key={index}
                onClick={() => typeof number === 'number' ? paginate(number) : null}
                disabled={number === '...'}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  number === currentPage
                    ? 'bg-blue-600 text-white'
                    : number === '...'
                    ? 'text-gray-500 cursor-default'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {number}
              </button>
            ))}

            {/* Next button */}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                currentPage === totalPages
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              Next
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default TransactionsPage;
