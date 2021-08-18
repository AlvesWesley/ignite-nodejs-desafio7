import { APIGatewayEvent } from 'aws-lambda'
import * as uuid from 'uuid'

import { document } from '../utils/dynamodbClient'

interface CreateTodo {
  title: string
  deadline: string
}

export const handle = async (event: APIGatewayEvent) => {
  const body = JSON.parse(event.body) as CreateTodo
  const id = uuid.v4()
  const { user_id } = event.pathParameters
  const { title, deadline } = body
  const done = false

  await document
    .put({
      TableName: 'todos',
      Item: {
        id,
        user_id,
        title,
        done,
        deadline
      }
    })
    .promise()

  return {
    statusCode: 201,
    body: JSON.stringify({
      id,
      user_id,
      title,
      done,
      deadline
    })
  }
}
