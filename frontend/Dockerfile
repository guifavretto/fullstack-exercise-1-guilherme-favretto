# Use official Node.js LTS as base (for building)
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies for better caching
# Copy package files first to leverage Docker cache
COPY package*.json ./

# Install dependencies with cache mount for faster rebuilds
RUN --mount=type=cache,target=/root/.npm \
    npm ci --only=production=false --prefer-offline

# Copy source code
COPY . .

# Build the Next.js app with build arguments
ARG NODE_ENV=production
ARG NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=${NODE_ENV} \
    NEXT_TELEMETRY_DISABLED=${NEXT_TELEMETRY_DISABLED}

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine AS runner

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies with cache mount
RUN --mount=type=cache,target=/root/.npm \
    npm ci --only=production --prefer-offline && \
    npm cache clean --force

# Copy built application from builder stage
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Add health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/api/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) }).on('error', () => process.exit(1))"

# Set environment variables
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1

# Run the app
CMD ["npm", "start"]