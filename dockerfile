FROM cypress/included:14.0.0

RUN mkdir /cypress-ejecution-docker

WORKDIR /cypress-ejecution-docker

COPY . .

RUN npm install

ENTRYPOINT ["npx", "cypress", "run"]

CMD [""]