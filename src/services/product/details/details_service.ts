import Category from "@/db/models/category";
import Product from "@/db/models/product";

export const DetailsService = {
  getDetails: (query: string | number) => {
    const id =
      typeof query == "number" && !isNaN(query) ? Number(query) : query;

    return Product.findOne({
      where: {
        id,
        is_active: true,
        deleted_at: null,
      },
      include: [
        {
          model: Category,
          as: "categories",
          attributes: ["id", "name", "slug", "image_url"],
        },
      ],
    });
  },
};
