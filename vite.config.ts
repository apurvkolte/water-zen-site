import { defineConfig } from "vite";
import type { ViteDevServer } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { componentTagger } from "lovable-tagger";

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },

  plugins: [
    react(),

    mode === "development" && componentTagger(),

    {
      name: "products-api",

      configureServer(server: ViteDevServer) {
        console.log("VITE API STARTED");

        server.middlewares.use((req, res, next) => {

          res.setHeader("Access-Control-Allow-Origin", "*");
          res.setHeader(
            "Access-Control-Allow-Methods",
            "GET,POST,DELETE,OPTIONS"
          );
          res.setHeader(
            "Access-Control-Allow-Headers",
            "Content-Type"
          );

          if (req.method === "OPTIONS") {
            res.statusCode = 200;
            res.end();
            return;
          }

          next();
        });
        //product
        server.middlewares.use("/api/products", (req, res) => {
          const file = path.resolve(
            __dirname,
            "src/data/product.json"
          );

          // GET product by id
          if (
            req.method === "GET" &&
            req.url &&
            req.url !== "/"
          ) {

            const products: Product[] = JSON.parse(
              fs.readFileSync(file, "utf8")
            );

            const id = Number(
              req.url.replace("/", "")
            );

            const product = products.find(
              (p) => p.id === id
            );


            if (!product) {
              res.statusCode = 404;
              res.end(JSON.stringify({
                success: false,
                message: "Product not found"
              }));
              return;
            }


            const related = products
              .filter(
                (p) =>
                  p.category === product.category &&
                  p.id !== product.id
              )
              .slice(0, 4);


            res.setHeader(
              "Content-Type",
              "application/json"
            );


            res.end(JSON.stringify({
              success: true,
              product,
              related
            }));

            return;
          }


          // GET all products
          if (req.method === "GET") {

            const products = fs.readFileSync(
              file,
              "utf8"
            );

            res.setHeader(
              "Content-Type",
              "application/json"
            );

            res.end(products);

            return;
          }

          // GET products
          if (req.method === "GET") {
            const products = fs.readFileSync(file, "utf8");

            res.setHeader(
              "Content-Type",
              "application/json"
            );

            res.end(products);
            return;
          }



          // CREATE / UPDATE product
          if (req.method === "POST") {
            let body = "";

            req.on("data", (chunk: Buffer) => {
              body += chunk.toString();
            });

            req.on("end", () => {
              try {
                const product: Product = JSON.parse(body);

                const products: Product[] = JSON.parse(
                  fs.readFileSync(file, "utf8")
                );

                const index = products.findIndex(
                  (p) => p.id === product.id
                );

                if (index !== -1) {
                  // Update existing product
                  products[index] = product;
                } else {
                  // Create new product
                  product.id =
                    products.length > 0
                      ? Math.max(
                        ...products.map((p) => p.id)
                      ) + 1
                      : 1;

                  products.push(product);
                }

                fs.writeFileSync(
                  file,
                  JSON.stringify(products, null, 2),
                  "utf8"
                );

                res.setHeader(
                  "Content-Type",
                  "application/json"
                );

                res.end(
                  JSON.stringify({
                    success: true,
                    product,
                  })
                );
              } catch (error) {
                res.statusCode = 500;

                res.end(
                  JSON.stringify({
                    success: false,
                    error: "Invalid product data",
                  })
                );
              }
            });

            return;
          }


          // DELETE Product
          if (req.method === "DELETE") {


            let body = "";

            req.on("data", (chunk: Buffer) => {
              body += chunk.toString();
            });

            req.on("end", () => {

              const { id } = JSON.parse(body);

              let products = JSON.parse(
                fs.readFileSync(file, "utf8")
              );

              const before = products.length;

              products = products.filter(
                (p: Product) => p.id !== Number(id)
              );


              fs.writeFileSync(
                file,
                JSON.stringify(products, null, 2),
                "utf8"
              );

              res.setHeader(
                "Content-Type",
                "application/json"
              );

              res.end(JSON.stringify({
                success: true
              }));
            });

            return;
          }

          res.statusCode = 405;
          res.end(
            JSON.stringify({
              error: "Method not allowed",
            })
          );
        });




        // CATEGORIES API
        server.middlewares.use("/api/categories", (req, res) => {

          const file = path.resolve(
            __dirname,
            "src/data/categories.json"
          );


          // GET categories
          if (req.method === "GET") {
            const categories = fs.readFileSync(file, "utf8");

            res.setHeader(
              "Content-Type",
              "application/json"
            );

            res.end(categories);
            return;
          }


          // ADD / UPDATE category
          if (req.method === "POST") {

            let body = "";

            req.on("data", (chunk: Buffer) => {
              body += chunk.toString();
            });


            req.on("end", () => {

              const { oldName, newName } = JSON.parse(body);


              let categories: string[] = JSON.parse(
                fs.readFileSync(file, "utf8")
              );


              // edit
              if (oldName) {

                categories = categories.map(cat =>
                  cat === oldName ? newName : cat
                );

              }

              // add
              else {

                const exists = categories.some(
                  cat =>
                    cat.toLowerCase() === newName.toLowerCase()
                );


                if (exists) {
                  res.end(JSON.stringify({
                    success: false,
                    message: "Category already exists"
                  }));
                  return;
                }


                categories.push(newName);
              }



              fs.writeFileSync(
                file,
                JSON.stringify(categories, null, 2),
                "utf8"
              );


              res.setHeader(
                "Content-Type",
                "application/json"
              );


              res.end(JSON.stringify({
                success: true,
                categories
              }));

            });


            return;
          }



          // DELETE category
          if (req.method === "DELETE") {

            let body = "";

            req.on("data", (chunk: Buffer) => {
              body += chunk.toString();
            });


            req.on("end", () => {

              const { category } = JSON.parse(body);


              let categories: string[] = JSON.parse(
                fs.readFileSync(file, "utf8")
              );


              categories = categories.filter(
                c => c !== category
              );


              fs.writeFileSync(
                file,
                JSON.stringify(categories, null, 2),
                "utf8"
              );


              res.end(JSON.stringify({
                success: true
              }));

            });


            return;
          }

          res.statusCode = 405;
          res.end();
        });


        server.middlewares.use("/api/banners", (req, res) => {

          const file = path.resolve(
            __dirname,
            "src/data/sliderImages.json"
          );


          // GET
          if (req.method === "GET") {

            const banners = fs.readFileSync(file, "utf8");

            res.setHeader(
              "Content-Type",
              "application/json"
            );

            res.end(banners);

            return;
          }



          // ADD / UPDATE
          if (req.method === "POST") {

            let body = "";

            req.on("data", (chunk) => {
              body += chunk.toString();
            });


            req.on("end", () => {

              const banner = JSON.parse(body);


              let banners = JSON.parse(
                fs.readFileSync(file, "utf8")
              );


              // update
              if (banner.index !== undefined) {

                banners[banner.index] = {
                  url: banner.url,
                  title: banner.title,
                  subtitle: banner.subtitle
                };

              }
              else {

                // add
                banners.push({
                  url: banner.url,
                  title: banner.title,
                  subtitle: banner.subtitle
                });

              }


              fs.writeFileSync(
                file,
                JSON.stringify(
                  banners,
                  null,
                  2
                ),
                "utf8"
              );


              res.end(JSON.stringify({
                success: true
              }));

            });


            return;
          }



          // DELETE
          if (req.method === "DELETE") {

            let body = "";

            req.on("data", (chunk) => {
              body += chunk.toString();
            });


            req.on("end", () => {

              const { index } = JSON.parse(body);


              let banners = JSON.parse(
                fs.readFileSync(file, "utf8")
              );


              banners.splice(index, 1);


              fs.writeFileSync(
                file,
                JSON.stringify(
                  banners,
                  null,
                  2
                )
              );


              res.end(JSON.stringify({
                success: true
              }));

            });


            return;
          }

        });

      },


    },
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },

    dedupe: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "@tanstack/react-query",
      "@tanstack/query-core",
    ],
  },
}));