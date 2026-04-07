FROM oven/bun:latest

WORKDIR /app

COPY package.json bun.lockb* ./
RUN bun install

COPY . .

# Generate migration jika diperlukan
# RUN bunx drizzle-kit generate:mysql

EXPOSE 3000

CMD ["bun", "run", "src/index.ts"]