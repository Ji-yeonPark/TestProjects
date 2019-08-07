class Solution(object):
    def twoSum(self, numbers, target):
        """
        :type numbers: List[int]
        :type target: int
        :rtype: List[int]
        """
        start = 0
        end = len(numbers) - 1       
        while start < end:
            _sum = numbers[start] + numbers[end]
            if _sum == target:
                return start+1, end+1
            elif _sum < target:
                start += 1
            elif _sum > target:
                end -= 1