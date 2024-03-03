// 함수의 이름과 함수가 어떻게 생겼는지(descriptor)를 인자로 받아서
// 우리가 재정의한 PropertyDescriptor를 반환함
// 함수를 한단계 감싸서 우리가 필요한 로그를 찍어주는 역할을 함
function Log(
  _: any,
  name: string,
  descriptor: PropertyDescriptor
): PropertyDescriptor {
  const newDescriptor = {
    ...descriptor,
    value: function (...args: any[]): any {
      console.log(`Calling ${name} with arguments:`);
      console.dir(args);
      const result = descriptor.value.apply(this, args);
      console.log("Result : ");
      console.log(result);
      return result;
    },
  };
  return newDescriptor;
}

class Calculator {
  @Log
  add(x: number, y: number): number {
    return x + y;
  }
}

const calculator: Calculator = new Calculator();
calculator.add(1, 2);
