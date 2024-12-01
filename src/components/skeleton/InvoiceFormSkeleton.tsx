import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function InvoiceFormSkeleton() {
  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardContent className="p-6">
          <div className="space-y-8">
            {/* Tax Option */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-10 w-[200px]" />
            </div>

            {/* Invoice Details */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i}>
                  <Skeleton className="h-4 w-[100px] mb-2" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>

            {/* Company Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(2)].map((_, i) => (
                <div key={i}>
                  <Skeleton className="h-4 w-[150px] mb-2" />
                  <Skeleton className="h-[100px] w-full" />
                </div>
              ))}
            </div>

            {/* Ship To & Terms */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(2)].map((_, i) => (
                <div key={i}>
                  <Skeleton className="h-4 w-[100px] mb-2" />
                  <Skeleton className="h-[100px] w-full" />
                </div>
              ))}
            </div>

            {/* Invoice Items */}
            <div className="space-y-4">
              <Skeleton className="h-4 w-[120px]" />
              <div className="space-y-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
              <Skeleton className="h-10 w-[150px]" />
            </div>

            {/* Total Amount */}
            <div className="flex justify-end items-center gap-2">
              <Skeleton className="h-6 w-[100px]" />
              <Skeleton className="h-8 w-[80px]" />
            </div>

            {/* Bank Details */}
            <Skeleton className="h-10 w-[200px]" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

