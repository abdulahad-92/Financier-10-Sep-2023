import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Define styles for the PDF
const styles = StyleSheet.create({
  page: {
    padding: 40,
    paddingBottom: 80, // Reserve space for footer
    fontSize: 11,
    fontFamily: "Times-Roman",
    color: "#4A4A4A",
    backgroundColor: "#FFFFFF",
  },
  header: {
    marginBottom: 20,
    textAlign: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#003087",
    paddingBottom: 10,
  },
  companyName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#003087",
    textAlign: "left",
    marginBottom: 5,
  },
  reportTitle: {
    fontSize: 18,
    marginTop: 5,
  },
  fileInfo: {
    fontSize: 12,
    color: "#4A4A4A",
    marginTop: 5,
    textAlign: "left",
    fontStyle: "italic",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#003087",
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#D3D3D3",
    paddingBottom: 4,
  },
  balanceContainer: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 12,
    backgroundColor: "#F5F6F5",
    borderRadius: 5,
    marginBottom: 10,
  },
  balanceLabel: {
    fontSize: 14,
    marginRight: 10,
  },
  balanceAmount: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#003087",
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#D3D3D3",
  },
  tableRow: {
    flexDirection: "row",
  },
  tableRowAlternate: {
    backgroundColor: "#F9FAFB",
  },
  tableColHeader: {
    width: "33.33%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#D3D3D3",
    backgroundColor: "#003087",
    color: "#FFFFFF",
    padding: 8,
    fontWeight: "bold",
    textAlign: "center",
  },
  tableCol: {
    width: "33.33%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#D3D3D3",
    padding: 8,
    textAlign: "center",
  },
  earning: {
    color: "#28A745",
  },
  expense: {
    color: "#DC3545",
  },
  erExContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    backgroundColor: "#F5F6F5",
    borderRadius: 5,
  },
  erExLabel: {
    fontSize: 12,
  },
  erExAmount: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#003087",
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 40,
    right: 40,
    textAlign: "center",
    fontSize: 10,
    color: "#4A4A4A",
    borderTopWidth: 1,
    borderTopColor: "#D3D3D3",
    paddingTop: 5,
    backgroundColor: "#F5F6F5",
  },
  errorText: {
    color: "#DC3545",
    textAlign: "center",
    fontSize: 12,
    marginTop: 20,
    fontStyle: "italic",
  },
});

// PDF Document Component
const FilePdf = ({ data }) => {
  if (!data || !data.fileName || !Array.isArray(data.transArr)) {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <Text style={styles.errorText}>Invalid or missing file data.</Text>
          <View style={styles.footer} fixed>
            <Text
              style={{ fontSize: 10 }}
              render={({ pageNumber, totalPages }) =>
                `Page ${pageNumber} of ${totalPages}`
              }
            />
            <Text style={{ marginTop: 2 }}>
              © 2025 Financier. All rights reserved.
            </Text>
          </View>
        </Page>
      </Document>
    );
  }

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.companyName}>Financier</Text>
          <Text style={styles.reportTitle}>Financial Report</Text>
          <Text style={styles.fileInfo}>
            {data.fileName || "Untitled"} | {data.currDate || "N/A"}
          </Text>
        </View>

        {/* Main Content with Wrapping */}
        <View wrap>
          {/* Net Balance */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Net Balance</Text>
            <View style={styles.balanceContainer}>
              <Text style={styles.balanceLabel}>Balance:</Text>
              <Text style={styles.balanceAmount}>${data.balance || "0"}</Text>
            </View>
          </View>

          {/* Transactions Table */}
          <View style={styles.section} wrap>
            <Text style={styles.sectionTitle}>Transactions</Text>
            {data.transArr.length > 0 ? (
              <View style={styles.table} wrap>
                <View style={styles.tableRow} fixed>
                  <Text style={styles.tableColHeader}>Type</Text>
                  <Text style={styles.tableColHeader}>Description</Text>
                  <Text style={styles.tableColHeader}>Amount</Text>
                </View>
                {data.transArr.map((trans, index) => {
                  const type =
                    trans[0] === "moneyIncrement" ? "Earning" : "Expense";
                  const symbol = trans[0] === "moneyIncrement" ? "+" : "-";
                  const amountStyle =
                    trans[0] === "moneyIncrement"
                      ? styles.earning
                      : styles.expense;
                  return (
                    <View
                      style={[
                        styles.tableRow,
                        index % 2 === 1 ? styles.tableRowAlternate : {},
                      ]}
                      key={index}
                      wrap={false}
                    >
                      <Text style={styles.tableCol}>{type}</Text>
                      <Text style={styles.tableCol}>{trans[1] || "N/A"}</Text>
                      <Text style={[styles.tableCol, amountStyle]}>
                        {symbol} ${trans[2] || "0"}
                      </Text>
                    </View>
                  );
                })}
              </View>
            ) : (
              <Text style={styles.errorText}>No transactions available.</Text>
            )}
          </View>

          {/* Earnings and Expenses with Conditional Break */}
          <View
            style={styles.section}
            wrap={false}
            break={data.transArr.length > 20}
          >
            <Text style={styles.sectionTitle}>Summary</Text>
            <View style={styles.erExContainer}>
              <View>
                <Text style={styles.erExLabel}>Total Earnings</Text>
                <Text style={[styles.erExAmount, styles.earning]}>
                  ${data.er || "0"}
                </Text>
              </View>
              <View>
                <Text style={styles.erExLabel}>Total Expenses</Text>
                <Text style={[styles.erExAmount, styles.expense]}>
                  ${data.ex || "0"}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text
            style={{ fontSize: 10 }}
            render={({ pageNumber, totalPages }) =>
              `Page ${pageNumber} of ${totalPages}`
            }
          />
          <Text style={{ marginTop: 2 }}>
            © 2025 Financier. All rights reserved.
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default FilePdf;
