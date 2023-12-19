import React from 'react';
import { PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { format, formatDistanceToNow } from 'date-fns';

const PaymentPrinter = ({ dataPayment }) => {
  const styles = StyleSheet.create({

    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
    },
  
    label: {
      fontSize: 14,
      marginBottom: 5,
    },
  
    value: {
      fontSize: 14,
    },
  
    totalLabel: {
      fontSize: 16,
      fontWeight: 'bold',
    },
  
    totalValue: {
      fontSize: 16,
    },
    page: {
      backgroundColor: '#f2f2f2',
      padding: 30,
      border: '1 solid #ccc',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
  
    section: {
      marginBottom: 10,
      borderTop: '1 solid #ccc',
      paddingTop: 10,
    },
  
    totalContainer: {
      marginTop: 20,
      borderTop: '1 solid #000',
      paddingTop: 10,
      textAlign: 'right',
    },    
  });


  return (
    <PDFViewer width={600} height={400}>
      <Document>
        <Page size="A4" style={styles.page}>
           <View style={styles.header}>
             <Text style={styles.title}>Invoice</Text>
           </View>

            <View style={styles.section}>
            <Text style={styles.label}>Is Paid:</Text>
            <Text style={styles.value}>{dataPayment.isPaid ? 'Yes' : 'No'}</Text>
            </View>

            <View style={styles.section}>
            <Text style={styles.label}>Notes:</Text>
            <Text style={styles.value}>{dataPayment.notes}</Text>
            </View>


            <View style={styles.section}>
            <Text style={styles.label}>Payment Date:</Text>
            <Text style={styles.value}>
              {format(new Date(dataPayment.paymentDate), "'on' MMMM do")}
            </Text>
            </View>


            <View style={styles.section}>
            <Text style={styles.label}>Payment Method:</Text>
            <Text style={styles.value}>{dataPayment.paymentMethod}</Text>
            </View>


            <View style={styles.section}>
            <Text style={styles.label}>Created At:</Text>
            <Text style={styles.value}>
              {formatDistanceToNow(new Date(dataPayment.createdAt))}
            </Text>
            </View>

          

          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalValue}>${dataPayment.amount}</Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>


  );
};

export default PaymentPrinter;