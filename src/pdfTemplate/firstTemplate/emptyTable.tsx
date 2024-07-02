import EmptyRow from "./emptyrow";

export default function EmptyTable({
    rowsCount,
    itemsLength,
  }: {
    rowsCount: number;
    itemsLength: number;
  }) {
    return (
      <>
        {rowsCount &&
          Array(rowsCount)
            .fill(0)
            .map((_, i) => <EmptyRow key={i} />)}
      </>
    );
  }