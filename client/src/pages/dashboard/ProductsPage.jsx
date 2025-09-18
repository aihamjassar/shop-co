import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  getAllProducts,
} from "../../store/thunks/productsThunk";
import { useEffect } from "react";
import { Edit, Eye, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/Table";
import { Link } from "react-router-dom";

export const ProductsPage = () => {
  const dispatch = useDispatch();
  const handleDeleteProduct = (productId) => {
    dispatch(deleteProduct(productId));
  };
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Products</h2>
        <Link
          to={"/dashboard/create-product"}
          className="flex justify-center items-center gap-1.5 w-28 h-12 rounded-xl shadow-md bg-black text-white cursor-pointer"
        >
          New product
        </Link>
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Tile</TableHeader>
            <TableHeader>Quantity</TableHeader>
            <TableHeader>Sold</TableHeader>
            <TableHeader>Price</TableHeader>
            <TableHeader>Category</TableHeader>
            <TableHeader>Actions</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product._id}>
              <TableCell>{product.title}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell>{product.sold}</TableCell>
              <TableCell>{"$" + product.price}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>
                <div className="space-x-2.5">
                  <Link
                    to={`/dashboard/update-product/${product._id}`}
                    className="cursor-pointer inline-block"
                    title="Edit"
                  >
                    <Edit size={20} />
                  </Link>
                  <button
                    className="cursor-pointer"
                    title="Delete"
                    onClick={() => handleDeleteProduct(product._id)}
                  >
                    <Trash2 size={20} />
                  </button>
                  <Link
                    to={"/details"}
                    className="cursor-pointer inline-block"
                    title="View"
                  >
                    <Eye size={20} />
                  </Link>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
