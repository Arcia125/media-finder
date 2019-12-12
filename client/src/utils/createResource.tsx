import { getData } from './getData';

enum ResourceStatus {
  pending,
  success,
  error,
}

export const createResource = ({ endpoint }) => {
  let status: ResourceStatus = ResourceStatus.pending;
  let result: any;

  const handleSuccess: (value: any) => void | PromiseLike<void> = data => {
    status = ResourceStatus.success;
    result = data;
  };

  const handleError: (reason: any) => void | PromiseLike<void> = err => {
    status = ResourceStatus.error;
    result = err;
  };

  let suspender = getData(endpoint)
    .then(handleSuccess)
    .catch(handleError);

  const resource = {
    read() {
      if (status === ResourceStatus.pending) throw suspender;
      if (status === ResourceStatus.error) throw result;
      if (status === ResourceStatus.success) return result;
    },
  };

  return resource;
};
