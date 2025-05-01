"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import {
  Store,
  Coffee,
  School,
  ShoppingCart,
  Zap,
  Search,
  Smartphone,
  DollarSign,
  HeadphonesIcon,
  Briefcase,
  Utensils,
  Building,
  ShoppingBag,
  GraduationCap,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"

// Add this type definition
type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function Home() {
  const [activeSection, setActiveSection] = useState("home")
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 100], [1, 0.2])

  // Inside your component, add state
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Add the submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Message sent!",
          description: "Your message has been saved successfully.",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "why-us", "services", "portfolio", "testimonials", "contact"]

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen">
      {/* Sticky Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Briefcase className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl text-black">WebCraft</span>
            </Link>

            <nav className="hidden md:flex space-x-8">
              {[
                { name: "Home", id: "home" },
                { name: "Why Us", id: "why-us" },
                { name: "Services", id: "services" },
                { name: "Portfolio", id: "portfolio" },
                { name: "Testimonials", id: "testimonials" },
                { name: "Contact", id: "contact" },
              ].map((item) => (
                <Link
                  key={item.id}
                  href={`#${item.id}`}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    activeSection === item.id ? "text-primary" : "text-black",
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="md:hidden">
              <Button variant="ghost" size="icon">
                <span className="sr-only">Toggle menu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4 relative">
          <motion.div
            className="absolute inset-0 -z-10 opacity-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ duration: 1 }}
          >
            {/* Floating Icons Background */}
            <motion.div
              className="absolute top-10 left-[10%]"
              animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 5, ease: "easeInOut" }}
            >
              <Store className="h-12 w-12 text-primary" />
            </motion.div>
            <motion.div
              className="absolute top-40 left-[30%]"
              animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 7, ease: "easeInOut" }}
            >
              <Coffee className="h-10 w-10 text-primary" />
            </motion.div>
            <motion.div
              className="absolute top-20 right-[20%]"
              animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 6, ease: "easeInOut" }}
            >
              <School className="h-14 w-14 text-primary" />
            </motion.div>
            <motion.div
              className="absolute bottom-20 right-[15%]"
              animate={{ y: [0, 15, 0], rotate: [0, -8, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 8, ease: "easeInOut" }}
            >
              <ShoppingCart className="h-12 w-12 text-primary" />
            </motion.div>
            <motion.div
              className="absolute bottom-40 left-[20%]"
              animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 6.5, ease: "easeInOut" }}
            >
              <Smartphone className="h-10 w-10 text-primary" />
            </motion.div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight whitespace-pre-wrap"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
              >
                {"We Build Websites That Bring Your Business Online!".split(" ").map((word, index) => (
                  <motion.span
                    key={index}
                    className="inline-block mr-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.2,
                      delay: index * 0.1,
                      ease: [0.2, 0.65, 0.3, 0.9],
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h1>

              <motion.p
                className="text-xl text-muted-foreground"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Get a modern, mobile-friendly website for your showroom, cafe, school, or any business — crafted just
                for you.
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Button size="lg" className="rounded-full">
                  Get a Free Quote
                </Button>
                <Button size="lg" variant="outline" className="rounded-full">
                  View Our Work
                </Button>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image src="/webdevelopment.png?height=800&width=600" alt="Web Development" fill className="object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-us" className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We deliver exceptional websites with these key advantages that set us apart from the competition.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Zap className="h-10 w-10 text-primary" />,
                title: "Speed",
                description: "Fast-loading websites that keep visitors engaged and improve search rankings.",
              },
              {
                icon: <Search className="h-10 w-10 text-primary" />,
                title: "SEO Optimization",
                description: "Built-in search engine optimization to help customers find your business online.",
              },
              {
                icon: <Smartphone className="h-10 w-10 text-primary" />,
                title: "Mobile-First Design",
                description: "Responsive websites that look great on phones, tablets, and desktops.",
              },
              {
                icon: <DollarSign className="h-10 w-10 text-primary" />,
                title: "Affordable Pricing",
                description: "Competitive rates with flexible packages to suit businesses of all sizes.",
              },
              {
                icon: <HeadphonesIcon className="h-10 w-10 text-primary" />,
                title: "Dedicated Support",
                description: "Ongoing assistance and maintenance to keep your website running smoothly.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      className="mb-4"
                    >
                      {item.icon}
                    </motion.div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section id="services" className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We specialize in creating custom websites for various types of local businesses.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Store className="h-12 w-12" />,
                title: "Local Shop Websites",
                description: "Custom websites for retail stores that showcase products and drive foot traffic.",
              },
              {
                icon: <Utensils className="h-12 w-12" />,
                title: "Restaurant/Cafe Sites",
                description: "Beautiful websites with menus, reservation systems, and online ordering.",
              },
              {
                icon: <Building className="h-12 w-12" />,
                title: "Showrooms",
                description: "Interactive galleries that highlight your products in their best light.",
              },
              {
                icon: <ShoppingBag className="h-12 w-12" />,
                title: "E-commerce Stores",
                description: "Online shops with secure payment processing and inventory management.",
              },
              {
                icon: <GraduationCap className="h-12 w-12" />,
                title: "School & Education Sites",
                description: "Informative websites for educational institutions with resource sections.",
              },
              {
                icon: <User className="h-12 w-12" />,
                title: "Portfolios & Personal Brands",
                description: "Showcase your work and personal brand with a professional online presence.",
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <Card className="h-full border-2 hover:border-primary transition-all duration-300">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <motion.div
                      className="p-4 rounded-full bg-primary/10 mb-4"
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    >
                      {service.icon}
                    </motion.div>
                    <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                    <p className="text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Work</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Browse through our portfolio of websites we've built for businesses like yours.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                image: "/cafe.png?height=600&width=800",
                title: "Cafe Sunshine",
                category: "Restaurant",
                description: "A bright, inviting website for a local cafe with online ordering.",
              },
              {
                image: "/motor.png?height=600&width=800",
                title: "Elite Motors",
                category: "Showroom",
                description: "Luxury car dealership with 360° virtual tours of vehicles.",
              },
              {
                image: "/school.png?height=600&width=800",
                title: "Green Valley School",
                category: "Education",
                description: "Comprehensive website for a K-12 school with parent portal.",
              },
              {
                image: "/fashion.png?height=600&width=800",
                title: "Urban Threads",
                category: "E-commerce",
                description: "Fashion boutique with integrated shopping cart and payment system.",
              },
              {
                image: "/spa.png?height=600&width=800",
                title: "Wellness Spa",
                category: "Service Business",
                description: "Spa and wellness center with online booking functionality.",
              },
              {
                image: "/fresh.png?height=600&width=800",
                title: "Fresh Market",
                category: "Local Shop",
                description: "Grocery store with weekly specials and delivery options.",
              },
            ].map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden h-full">
                  <motion.div
                    className="relative h-48 w-full"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-4 text-white">
                        <span className="text-sm font-medium bg-primary px-2 py-1 rounded-full">
                          {project.category}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-1">{project.title}</h3>
                    <p className="text-sm text-muted-foreground">{project.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button size="lg" variant="outline" className="rounded-full">
              View All Projects
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our clients have to say about working with us.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Sylesh Singh",
                business: "Cafe Sunshine",
                image: "/placeholder.svg?height=200&width=200",
                quote:
                  "Our website has helped us increase online orders by 40%. The design perfectly captures our cafe's atmosphere!",
              },
              {
                name: "Sunil Verma",
                business: "Elite Motors",
                image: "/placeholder.svg?height=200&width=200",
                quote:
                  "The virtual showroom feature has revolutionized how we showcase our vehicles. Customers love browsing our inventory online.",
              },
              {
                name: "Aditya krishna Yadav",
                business: "Green Valley School",
                image: "/placeholder.svg?height=200&width=200",
                quote:
                  "Parents and students find our new website incredibly easy to navigate. The calendar and resource sections are especially helpful.",
              },
              {
                name: "Nishu Niharika",
                business: "Urban Threads",
                image: "/placeholder.svg?height=200&width=200",
                quote:
                  "Since launching our e-commerce site, we've expanded our customer base nationwide. The shopping experience is seamless.",
              },
              {
                name: "Sunita Patel",
                business: "Wellness Spa",
                image: "/placeholder.svg?height=200&width=200",
                quote:
                  "The online booking system has reduced our administrative workload significantly. Our clients love the convenience!",
              },
              {
                name: "Rohan Sharma",
                business: "Fresh Market",
                image: "/placeholder.svg?height=200&width=200",
                quote:
                  "Our website has become an essential tool for our business. The weekly specials page drives significant foot traffic to our store.",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                        <Image
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.business}</p>
                      </div>
                    </div>
                    <div className="relative">
                      <svg
                        className="absolute -top-2 -left-2 h-6 w-6 text-primary/20"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                      <p className="text-muted-foreground pl-6">{testimonial.quote}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Let's Talk</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ready to bring your business online? Get in touch with us for a free consultation.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Send Us a Message</h3>
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">Name</label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Your name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">Email</label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="Your email"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                        placeholder="How can we help?"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">Message</label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                        placeholder="Tell us about your project"
                        rows={4}
                        required
                      />
                    </div>
                    <Button 
                      className="w-full rounded-full" 
                      size="lg"
                      type="submit"
                      disabled={isLoading}
                    >
                      {isLoading ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <svg
                        className="h-5 w-5 mr-3 text-primary mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <div>
                        <h4 className="font-medium">Phone</h4>
                        <p className="text-muted-foreground">(+91) 9508019871 </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <svg
                        className="h-5 w-5 mr-3 text-primary mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <div>
                        <h4 className="font-medium">Email</h4>
                        <p className="text-muted-foreground">amitkumar2020grl@gmail.com</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <svg
                        className="h-5 w-5 mr-3 text-primary mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a2 2 0 010-2.827L16.657 6.343a2 2 0 012.827 0l4.244 4.243a2 2 0 010 2.827l-4.244 4.243z"
                        />
                      </svg>
                      <div>
                        <h4 className="font-medium">Location</h4>
                        <p className="text-muted-foreground">Gautam Buddha Nagar, Greater Noida, 201306</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <svg
                        className="h-5 w-5 mr-3 text-primary mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <div>
                        <h4 className="font-medium">Business Hours</h4>
                        <p className="text-muted-foreground">Monday - Friday: 9am - 5pm</p>
                        <p className="text-muted-foreground">Saturday: 10am - 2pm</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Follow Us</h3>
                  <div className="flex space-x-4">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="rounded-full"
                      onClick={() => window.open('https://x.com/AmitPra46489018?t=UQhxnWVDejtKJ1CT30M2xw&s=09', '_blank')}
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                      </svg>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="rounded-full"
                      onClick={() => window.open('https://www.facebook.com/share/16MwxHkAes/', '_blank')}
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                      </svg>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="rounded-full"
                      onClick={() => window.open('https://www.instagram.com/amitprajapati111?igsh=MWE4djVvZmFya3NieQ==', '_blank')}
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="rounded-full"
                      onClick={() => window.open('https://www.linkedin.com/in/amit-prajapati-ba6b932a2?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', '_blank')}
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Our Location</h3>
                  <div className="aspect-video bg-muted rounded-md overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.6526392056247!2d77.49784147524825!3d28.459109875727433!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cc1df6aaaaaab%3A0x8547e11707fe9a78!2sGautam%20Buddha%20University!5e0!3m2!1sen!2sin!4v1682692591955!5m2!1sen!2sin"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={true}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Briefcase className="h-6 w-6 text-primary" />
                <span className="font-bold text-xl">WebCraft</span>
              </div>
              <p className="text-muted-foreground">
                We build beautiful, functional websites that help local businesses thrive online.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Services</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Local Shop Websites
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Restaurant/Cafe Sites
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Showrooms
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    E-commerce Stores
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    School & Education Sites
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Our Team
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} WebCraft. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <p className="text-sm text-muted-foreground">Designed with ❤️ for local businesses</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
