"use client";
import { Suspense } from "react";
import { lazy } from "react";
import { useEffect } from "react";
import { Heart, Minus, Plus, Share2 } from "lucide-react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { toast } from "sonner";
import ProductDetailSkeleton from "@/component/skeleton/ProductDetailSkeleton";
import axios from "axios";
import { useRef } from "react";
// import { toast } from "@/components/ui/use-toast";
// import { useToast } from "@/components/ui/use-toast";
const ShoppingCartTopUp = lazy(() => import("./ShoppingCartTopUp"));

// import { cn } from "@/lib/utils"
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetail() {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("yellow");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [api, setApi] = useState();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [hoveredImageIndex, setHoveredImageIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const sizes = ["XS", "S", "M", "L", "XL"];
  const colors = ["yellow", "blue", "pink", "purple"];
  const [product, setProduct] = useState(null);
  const location = useLocation();
  const productData = location.state?.product;
  // console.log(product);
  const popUp = useRef(null)
  const productId = productData._id;

  useEffect(() => {
    const singlePrd = async () => {
      try {
        let res = await axios.post(
          `${import.meta.env.VITE_PRODUCT_SINGLE_PRODUCT}`,
          { pId: productId }
        );
        setProduct(res.data.product);
      } catch (error) {
        return <ProductDetailSkeleton />;
      }
    };
    singlePrd();
  }, []);

  useEffect(() => {
    if (!api) {
      return () => {}; // Return empty cleanup function
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap() + 1);
      setActiveIndex(api.selectedScrollSnap());
    };

    api.on("select", handleSelect);

    // Cleanup function
    return () => {
      api.off("select", handleSelect); // Remove event listener
    };
  }, [api]);

  const addtoCart = ()=>{
        popUp.current.click()      
  }
 console.log("product",product);
 

  if (!product) return <ProductDetailSkeleton />;
  const productImages = product.pImages.map((img) => img.URL) || [];

  return (
    <div className="min-h-screen bg-pink-50 md:bg-pink-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Main Product Section */}
        <Card className="bg-white rounded-3xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-4 md:p-8">
            {/* Image Section */}
            <div className="relative">
              {/* chat gpt  */}

              {/* Desktop: Vertical thumbnails on the left */}
              <div className="hidden md:flex flex-col gap-4 absolute left-0 top-0 h-full pr-4">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onMouseEnter={() => setHoveredImageIndex(index)} // Set hover state
                    onMouseLeave={() => setHoveredImageIndex(null)} // Reset on leave
                    onClick={() => setSelectedImageIndex(index)} // Click to set selected image
                    className={cn(
                      "relative w-16 aspect-[3/4] rounded-lg overflow-hidden border-2",
                      selectedImageIndex === index
                        ? "border-black"
                        : "border-transparent hover:border-gray-200"
                    )}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Product ${index + 1}`}
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Main Image */}
              <div className="hidden md:flex aspect-[3/4] relative rounded-2xl overflow-hidden md:ml-20">
                <img
                  src={
                    productImages[
                      hoveredImageIndex !== null
                        ? hoveredImageIndex
                        : selectedImageIndex
                    ] || "/placeholder.svg"
                  }
                  alt="Product Image"
                  className="object-cover"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full"
                >
                  <Heart className="w-5 h-5" />
                </Button>
              </div>

              {/* Mobile: Horizontal thumbnails below */}
              <div className="flex md:hidden gap-2 mt-4 overflow-auto pb-2 snap-x">
                <div className="mx-auto max-w-xs">
                  <Carousel setApi={setApi} className="w-full max-w-xs">
                    <CarouselContent>
                      {productImages.map((image, index) => {
                        return (
                          <CarouselItem key={index}>
                            <Card>
                              <CardContent className="flex aspect-square items-center justify-center p-6">
                                {/* <span className="text-4xl font-semibold">{index + 1}</span> */}
                                <img src={image} alt="" />
                              </CardContent>
                            </Card>
                          </CarouselItem>
                        );
                      })}
                    </CarouselContent>
                  </Carousel>
                  {/* Dots Navigation */}
                  <div className="flex justify-center gap-2 mt-4">
                    {productImages.map((_, index) => (
                      <div
                        key={index}
                        className={`h-2 w-2 rounded-full transition-all duration-300 ${
                          activeIndex === index
                            ? "bg-blue-500 scale-125"
                            : "bg-gray-300"
                        }`}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Product Details Section */}
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-semibold">{product.pName}</h1>
                <p>{product.pDescription}</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex">
                    {[1, 2, 3, 4].map((star) => (
                      <span key={star} className="text-yellow-400">
                        ★
                      </span>
                    ))}
                    <span className="text-gray-300">★</span>
                  </div>
                  <span className="text-sm text-gray-500">(4.0)</span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold">
                    Rs. {(product.pPrice * (100 - product.pOffer)) / 100}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    Rs. {product.pPrice}
                  </span>
                  <span className="text-sm text-green-600 font-medium bg-green-100 px-2 py-0.5 rounded">
                    {product.pOffer}% OFF
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  Tax included. Shipping calculated at checkout.
                </p>
              </div>

              {/* Size Selector */}
              <div className="space-y-4">
                <div>
                  <Label className="text-base">Size</Label>
                  <RadioGroup
                    defaultValue={selectedSize}
                    onValueChange={setSelectedSize}
                    className="flex flex-wrap gap-2 mt-2"
                  >
                    {sizes.map((size) => (
                      <Label
                        key={size}
                        className={`px-4 py-2 rounded-full border-2 cursor-pointer ${
                          selectedSize === size
                            ? "border-black bg-black text-white"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <RadioGroupItem value={size} className="sr-only" />
                        {size}
                      </Label>
                    ))}
                  </RadioGroup>
                </div>

                {/* Color Selector */}
                <div>
                  <Label className="text-base">Color</Label>
                  <RadioGroup
                    defaultValue={selectedColor}
                    onValueChange={setSelectedColor}
                    className="flex gap-2 mt-2"
                  >
                    {colors.map((color) => (
                      <Label
                        key={color}
                        className={`w-8 h-8 rounded-full cursor-pointer border-2 ${
                          selectedColor === color
                            ? "border-black"
                            : "border-transparent"
                        }`}
                      >
                        <RadioGroupItem value={color} className="sr-only" />
                        <span
                          className="block w-full h-full rounded-full"
                          style={{ backgroundColor: color }}
                        />
                      </Label>
                    ))}
                  </RadioGroup>
                </div>

                {/* Quantity Selector */}
                <div>
                  <Label className="text-base">Quantity</Label>
                  <div className="flex items-center gap-2 mt-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-12 text-center">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
               <div >
                    <Suspense fallback={<div>Loading...</div>}>
                      <ShoppingCartTopUp  ref={popUp} />
                    </Suspense>
                  </div>
                <Button className="flex-1 text-lg h-12" onClick={addtoCart}>Add to Cart</Button>
                <Button variant="secondary" className="flex-1 text-lg h-12">
                  {" "}
                  Buy Now{" "}
                </Button>
              </div>

              {/* Share Button */}
              <Button variant="ghost" className="w-full sm:w-auto">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </Card>

        {/* Similar Products */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <div className="aspect-[3/4] relative">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%7B29A32F65-986C-4D6C-9FA9-F59A29CACDEF%7D-gh0Fx6Io6ARfqYrKf5RUUO65Z6pXBd.png"
                  alt="Similar Product"
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium truncate">
                  Adaa Jaipur Comfort Printed Cotton Shirt
                </h3>
                <div className="flex items-center justify-between mt-2">
                  <span className="font-bold">Rs. 1,999.00</span>
                  <span className="text-sm text-green-600 font-medium bg-green-100 px-2 py-0.5 rounded">
                    33% OFF
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
