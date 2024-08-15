---
theme: dashboard
toc: false
sql:
  txn1mm: ./data/cc_data_1mm.parquet
---
# Credit Card Transactions
This dashboard presents a customer-centric view of the same dataset used in the sales dashboard.

```sql id=all_users
SELECT DISTINCT cc_num FROM txn1mm ORDER BY cc_num
```

```js
const cc_num_col = all_users.getChildAt(0);
const cc_num_array = [null].concat(cc_num_col.toArray())
const selected_cc_num = view(
  Inputs.select(cc_num_array, {
    label: "Select User",
  })
);
```

```sql id=filtered_transactions
SELECT * FROM txn1mm WHERE ${selected_cc_num} IS NULL OR cc_num=${selected_cc_num}
```
```sql id=filtered_category_breakdown
SELECT category, COUNT(*) as count
FROM txn1mm WHERE ${selected_cc_num} IS NULL OR cc_num=${selected_cc_num} 
GROUP BY category
```

```js
const amt_col = filtered_transactions.getChild('amt');
const sum = amt_col.toArray().reduce((acc, val) => acc + val, 0);
const avg = sum / filtered_transactions.numRows
```

```js
function categoryBreakdown(data, {width} = {}) {
  return Plot.plot({
    marginBottom: 80,
    x: {
      tickRotate: -30,
    },
    y: {
      transform: (d) => d / 1000,
      label: "↑ Number of Transactions (thousands)",
      grid: 5
    },
    marks: [
      Plot.ruleY([0]),
      Plot.barY(data, {
        x: "category",
        y: "count",
        sort: { x: "y", reverse: true, limit: 20 },
        fill: "steelblue"
      }),
    ]
  });
}
```

<div class="grid grid-cols-3">
  <div class="card">
    <h2>Number of Transactions</h2>
    <span class="big">${filtered_transactions.numRows.toLocaleString("en-US")}</span>
  </div>
  <div class="card">
    <h2>Sum of Transaction Amounts</h2>
    <span class="big">${sum.toLocaleString("en-US")}</span>
  </div>
  <div class="card">
    <h2>Average of Transaction Amounts</h2>
    <span class="big">${avg.toFixed(2).toLocaleString("en-US")}</span>
  </div>
  <div class="card grid-rowspan-4 grid-colspan-3">
    <h2>Category Breakdown</h2>
    ${resize((width) => categoryBreakdown(filtered_category_breakdown, {width}))}
  </div>
</div>


```js
view(Inputs.table(filtered_transactions))
```