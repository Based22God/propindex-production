"use client"

import { useState, useEffect } from "react"
import { Search, BarChart3, MapPin, TrendingUp, TrendingDown, Filter, Calendar, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Mock property data - replace with real API later
const mockProperties = [
  {
    id: 1,
    address: "67 Queens Gate",
    postcode: "W1U 6QW",
    price: 842000,
    originalPrice: 950000,
    status: "SOLD",
    change: -11.4,
    daysOnMarket: 34,
    bedrooms: 3,
    bathrooms: 2,
    propertyType: "Flat",
    image: "https://images.unsplash.com/photo-1560184318-d4c4b2e0e5d4?w=400&h=250&fit=crop"
  },
  {
    id: 2,
    address: "45 Victoria Road", 
    postcode: "W1K 3SG",
    price: 577000,
    originalPrice: 650000,
    status: "SOLD",
    change: -23.3,
    daysOnMarket: 14,
    bedrooms: 2,
    bathrooms: 1,
    propertyType: "House",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=250&fit=crop"
  },
  {
    id: 3,
    address: "12 Church Close",
    postcode: "SE1 9SG", 
    price: 692000,
    originalPrice: 620000,
    status: "SOLD",
    change: 76.9,
    daysOnMarket: 41,
    bedrooms: 4,
    bathrooms: 3,
    propertyType: "House",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=250&fit=crop"
  },
  {
    id: 4,
    address: "89 Green Road",
    postcode: "SE1 9SG",
    price: 599000,
    originalPrice: 680000,
    status: "SOLD", 
    change: -12.2,
    daysOnMarket: 38,
    bedrooms: 3,
    bathrooms: 2,
    propertyType: "Flat",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=250&fit=crop"
  },
  {
    id: 5,
    address: "23 Kings Way",
    postcode: "SW7 2AZ",
    price: 1200000,
    originalPrice: 1150000,
    status: "SOLD",
    change: 4.3,
    daysOnMarket: 22,
    bedrooms: 5,
    bathrooms: 4,
    propertyType: "House",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=250&fit=crop"
  },
  {
    id: 6,
    address: "156 Park Avenue",
    postcode: "WC1H 9JP",
    price: 450000,
    originalPrice: 475000,
    status: "SOLD",
    change: -5.3,
    daysOnMarket: 67,
    bedrooms: 2,
    bathrooms: 1,
    propertyType: "Flat",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=250&fit=crop"
  }
]

function formatPrice(price: number) {
  if (price >= 1000000) return `£${(price / 1000000).toFixed(1)}M`
  if (price >= 1000) return `£${(price / 1000).toFixed(0)}K`
  return `£${price.toLocaleString()}`
}

function PropertyCard({ property }: { property: any }) {
  const changeColor = property.change > 0 ? "text-green-600" : "text-red-600"
  const ChangeIcon = property.change > 0 ? TrendingUp : TrendingDown

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img 
          src={property.image} 
          alt={property.address}
          className="w-full h-48 object-cover"
        />
        <Badge className="absolute top-3 right-3 bg-green-600 hover:bg-green-700">
          {property.status}
        </Badge>
      </div>
      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">{property.address}</h3>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1" />
            {property.postcode}
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <p className="text-2xl font-bold">{formatPrice(property.price)}</p>
              {property.originalPrice !== property.price && (
                <p className="text-sm text-muted-foreground line-through">
                  {formatPrice(property.originalPrice)}
                </p>
              )}
            </div>
            <div className={`flex items-center ${changeColor}`}>
              <ChangeIcon className="h-4 w-4 mr-1" />
              <span className="font-semibold">
                {property.change > 0 ? '+' : ''}{property.change}%
              </span>
            </div>
          </div>

          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{property.bedrooms} bed, {property.bathrooms} bath</span>
            <span>{property.daysOnMarket}d on market</span>
          </div>
          
          <div className="flex items-center justify-between pt-2">
            <Badge variant="outline">{property.propertyType}</Badge>
            <span className="text-xs text-muted-foreground">
              {Math.floor(Math.random() * 30) + 1}d ago
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredProperties, setFilteredProperties] = useState(mockProperties)
  const [priceFilter, setPriceFilter] = useState("all")
  const [timeFilter, setTimeFilter] = useState("7days")

  // Filter properties based on search and filters
  useEffect(() => {
    let filtered = mockProperties

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(property =>
        property.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.postcode.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Price filter
    if (priceFilter !== "all") {
      filtered = filtered.filter(property => {
        switch (priceFilter) {
          case "under500k": return property.price < 500000
          case "500k-1m": return property.price >= 500000 && property.price < 1000000
          case "over1m": return property.price >= 1000000
          default: return true
        }
      })
    }

    setFilteredProperties(filtered)
  }, [searchQuery, priceFilter])

  // Calculate market stats
  const totalProperties = filteredProperties.length
  const averagePrice = filteredProperties.reduce((sum, p) => sum + p.price, 0) / totalProperties
  const averageDays = filteredProperties.reduce((sum, p) => sum + p.daysOnMarket, 0) / totalProperties

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <BarChart3 className="h-6 w-6" />
            <h1 className="text-xl font-bold">PropIndex</h1>
          </div>
          <nav className="flex items-center space-x-4">
            <Button variant="ghost">Insights</Button>
            <Button variant="ghost">Leads</Button>
            <Button variant="ghost">Reports</Button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Professional Property Intelligence
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Real-time market data and insights for estate agents
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Enter postcode or address..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 py-6 text-lg"
              />
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Button 
              variant={priceFilter === "all" ? "default" : "outline"}
              onClick={() => setPriceFilter("all")}
            >
              <DollarSign className="h-4 w-4 mr-2" />
              All Prices
            </Button>
            <Button 
              variant={priceFilter === "under500k" ? "default" : "outline"}
              onClick={() => setPriceFilter("under500k")}
            >
              Under £500K
            </Button>
            <Button 
              variant={priceFilter === "500k-1m" ? "default" : "outline"}
              onClick={() => setPriceFilter("500k-1m")}
            >
              £500K - £1M
            </Button>
            <Button 
              variant={priceFilter === "over1m" ? "default" : "outline"}
              onClick={() => setPriceFilter("over1m")}
            >
              Over £1M
            </Button>
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Last 30 days
            </Button>
          </div>
        </div>

        {/* Market Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalProperties}</div>
              <p className="text-xs text-muted-foreground">Recently sold</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Average Price</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatPrice(averagePrice)}</div>
              <p className="text-xs text-muted-foreground">In selected area</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Avg. Time on Market</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.round(averageDays)} days</div>
              <p className="text-xs text-muted-foreground">Recent sales</p>
            </CardContent>
          </Card>
        </div>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Recent Sales - SW1A Area</h2>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {totalProperties} properties found
            </span>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <Button size="lg">
            Load More Properties
          </Button>
        </div>
      </main>
    </div>
  )
}
