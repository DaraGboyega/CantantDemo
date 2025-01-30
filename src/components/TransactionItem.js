import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TransactionItem = ({ item }) => {
  const { type, amount, description, date } = item;
  const isIncome = type === 'income';

  return (
    <View style={[styles.container, isIncome && styles.incomeContainer]}>
      <View style={styles.leftContent}>
        <Text style={styles.description} numberOfLines={1}>
          {description}
        </Text>
        <Text style={styles.date}>
          {new Date(date * 1000).toLocaleDateString()}
        </Text>
      </View>
      
      <View style={styles.rightContent}>
        <Text style={[
          styles.amount,
          isIncome ? styles.incomeAmount : styles.expenseAmount
        ]}>
          {isIncome ? '+' : '-'}${Math.abs(amount).toFixed(2)}
        </Text>
        <View style={[
          styles.badge,
          isIncome ? styles.incomeBadge : styles.expenseBadge
        ]}>
          <Text style={[
            styles.badgeText,
            isIncome ? styles.incomeBadgeText : styles.expenseBadgeText
          ]}>
            {isIncome ? 'CASH IN' : 'CASH OUT'}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#e74c3c', // default expense color
  },
  incomeContainer: {
    borderLeftColor: '#2ecc71',
  },
  leftContent: {
    flex: 1,
    marginRight: 16,
  },
  rightContent: {
    alignItems: 'flex-end',
  },
  description: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2c3e50',
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: '#95a5a6',
  },
  amount: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  incomeAmount: {
    color: '#2ecc71',
  },
  expenseAmount: {
    color: '#e74c3c',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  incomeBadge: {
    backgroundColor: 'rgba(46, 204, 113, 0.1)',
  },
  expenseBadge: {
    backgroundColor: 'rgba(231, 76, 60, 0.1)',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  incomeBadgeText: {
    color: '#2ecc71',
  },
  expenseBadgeText: {
    color: '#e74c3c',
  },
});

export default TransactionItem;
