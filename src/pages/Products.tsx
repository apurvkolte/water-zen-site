import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
// import { products, categories } from "@/data/products";
import { getProducts, Product } from "@/services/products";
import { getCategories, Category } from "@/services/categories";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState<"default" | "asc" | "desc">("default");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // optional
    });
  }, []);

  useEffect(() => {

    const loadData = async () => {

      try {

        const [
          productsData,
          categoriesData
        ] = await Promise.all([
          getProducts(),
          getCategories()
        ]);


        setProducts(productsData);


        setCategories([
          "All",
          ...categoriesData.map(
            (cat: Category) => cat.name
          )
        ]);


      } catch (error) {

        console.error(
          "Load products failed:",
          error
        );

      } finally {

        setLoading(false);

      }

    };


    loadData();

  }, []);



  const filtered = useMemo(() => {

    let list =
      selectedCategory === "All"
        ? [...products]
        : products.filter(
          p => p.category === selectedCategory
        );


    if (sortOrder === "asc") {
      list.sort(
        (a, b) => a.price - b.price
      );
    }


    if (sortOrder === "desc") {
      list.sort(
        (a, b) => b.price - a.price
      );
    }


    return list;

  }, [
    selectedCategory,
    sortOrder,
    products
  ]);



  if (loading) {

    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading products...
      </div>
    );

  }


  return (
    <div>
      {/* Page Banner */}
      <section className="gradient-hero text-primary-foreground py-16">
        <div className="container   text-center">
          <h1 className="font-heading text-3xl md:text-5xl font-bold mb-3">Our Products</h1>
          <p className="text-primary-foreground/80 max-w-xl mx-auto">Explore the best RO, UV, UF & Alkaline water purifiers in Pune. Quality you can trust.</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container px-2 md:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="lg:w-64 shrink-0">
              <div className="glass-card p-5 sticky top-24">
                <h3 className="font-heading font-bold text-foreground mb-4">Categories</h3>
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${selectedCategory === cat
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-accent"
                        }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* <div className="border-t border-border mt-5 pt-5">
                  <h3 className="font-heading font-bold text-foreground mb-3">Sort by Price</h3>
                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as "default" | "asc" | "desc")}
                    className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="default">Default</option>
                    <option value="asc">Price: Low to High</option>
                    <option value="desc">Price: High to Low</option>
                  </select>
                </div> */}
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-6">
                <p className="text-muted-foreground text-sm">{filtered.length} products found</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 ">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              {filtered.length === 0 && (
                <div className="text-center py-20 text-muted-foreground">
                  <p className="text-lg">No products found in this category.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
