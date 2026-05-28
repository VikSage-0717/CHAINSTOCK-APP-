import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';

interface PaginationProps {
  onPageChange?: (page: number) => void;
  currentPage?: number;
  totalPages?: number;
}

function Pagination({ onPageChange, currentPage = 1, totalPages = 1 }: PaginationProps) {
  const renderPages = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 4) pages.push('...');

      const start = Math.max(2, currentPage - 2);
      const end = Math.min(totalPages - 1, currentPage + 2);

      for (let i = start; i <= end; i++) pages.push(i);

      if (currentPage < totalPages - 3) pages.push('...');
      pages.push(totalPages);
    }

    return pages.map((p, idx) => {
      if (p === '...') return <PaginationEllipsis key={`e-${idx}`} />;

      const page = p as number;
      return (
        <PaginationLink
          key={page}
          isActive={page === currentPage}
          onPress={() => onPageChange?.(page)}
        >
          <Text>{String(page)}</Text>
        </PaginationLink>
      );
    });
  };

  return (
    <View style={styles.pagination}>
      <PaginationContent>
        <PaginationPrevious onPress={() => onPageChange?.(Math.max(1, currentPage - 1))} />
        {renderPages()}
        <PaginationNext onPress={() => onPageChange?.(Math.min(totalPages, currentPage + 1))} />
      </PaginationContent>
    </View>
  );
}

function PaginationContent({ children }: any) {
  return <View style={styles.content}>{children}</View>;
}

function PaginationItem({ children }: any) {
  return <View>{children}</View>;
}

interface PaginationLinkProps {
  isActive?: boolean;
  children?: React.ReactNode;
  onPress?: () => void;
}

function PaginationLink({ isActive, children, onPress }: PaginationLinkProps) {
  return (
    <TouchableOpacity
      style={[styles.link, isActive && styles.linkActive]}
      onPress={onPress}
    >
      <Text style={[styles.linkText, isActive && styles.linkTextActive]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
}

interface PaginationPreviousProps {
  onPress?: () => void;
}

function PaginationPrevious({ onPress }: PaginationPreviousProps) {
  return (
    <PaginationLink onPress={onPress}>
      <View style={styles.navButton}>
        <ChevronLeft size={16} color="#1f2937" />
        <Text style={styles.navButtonText}>Previous</Text>
      </View>
    </PaginationLink>
  );
}

interface PaginationNextProps {
  onPress?: () => void;
}

function PaginationNext({ onPress }: PaginationNextProps) {
  return (
    <PaginationLink onPress={onPress}>
      <View style={styles.navButton}>
        <Text style={styles.navButtonText}>Next</Text>
        <ChevronRight size={16} color="#1f2937" />
      </View>
    </PaginationLink>
  );
}

function PaginationEllipsis() {
  return (
    <View style={styles.ellipsis}>
      <Text style={styles.ellipsisText}>...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pagination: {
    justifyContent: 'center',
    marginVertical: 16,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 4,
  },
  link: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    minWidth: 36,
    alignItems: 'center',
    marginHorizontal: 2,
  },
  linkActive: {
    backgroundColor: '#e5e7eb',
  },
  linkText: {
    fontSize: 14,
    color: '#6b7280',
  },
  linkTextActive: {
    color: '#1f2937',
    fontWeight: '500',
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  navButtonText: {
    fontSize: 14,
    color: '#1f2937',
  },
  ellipsis: {
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  ellipsisText: {
    fontSize: 14,
    color: '#6b7280',
  },
});

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
